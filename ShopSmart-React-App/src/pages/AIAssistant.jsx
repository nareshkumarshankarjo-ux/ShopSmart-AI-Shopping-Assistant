import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const suggestions = ["Budget laptop under 40000 with best battery", "Best mobile under 30000", "Headphones under 5000", "Recommend products for me", "What is in my cart?"];
const money = n => `₹${Number(n || 0).toLocaleString("en-IN")}`;
const same = (a,b) => String(a) === String(b);
const categoryRules = { Laptop: /\b(laptops?|notebooks?|computers?)\b/i, Mobile: /\b(mobiles?|phones?|smartphones?|5g)\b/i, Headphone: /\b(headphones?|earphones?|headsets?)\b/i, Watch: /\b(watch|watches|smartwatch|smartwatches)\b/i, Tablet: /\b(tablets?|tabs?)\b/i, Camera: /\b(cameras?|photography)\b/i };
const welcome = () => [{ role: "assistant", text: "Hello! I am your ShopSmart Assistant. Tell me your budget, product category or preferences, and I will recommend matching products from our catalog." }];

export function buildReply(query, products, cart, wishlist) {
  const q = query.toLowerCase().trim();
  if (/^(hi|hello|hey)[!. ]*$/.test(q)) return { text: "Hello! What would you like to shop for today?" };
  if (/\b(my cart|cart total|in my cart)\b/.test(q) && !/recommend|suggest/.test(q)) return { text: cart.length ? `Your cart contains ${cart.map(p => `${p.name} × ${p.quantity || 1}`).join(", ")}. Total: ${money(cart.reduce((s,p)=>s+Number(p.price)*Number(p.quantity || 1),0))}.` : "Your cart is empty." };
  if (/\bmy wishlist\b/.test(q) && !/recommend|suggest/.test(q)) return { text: wishlist.length ? `Your wishlist contains ${wishlist.map(p=>p.name).join(", ")}.` : "Your wishlist is empty." };
  if (!products.length) return { text: "The product catalog is unavailable. Please check the product server and try again." };
  const personal = /recommend.*for me|personaliz|based on|my preferences|suggest.*for me/.test(q);
  const category = Object.keys(categoryRules).find(k=>categoryRules[k].test(q));
  const match = q.replace(/,/g, "").match(/(?:under|below|less than|within|up to|maximum|max|budget(?: of)?)\s*(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(k|thousand)?\b/);
  const budget = match ? Number(match[1]) * (match[2] ? 1000 : 1) : null;
  const named = products.filter(p => q.includes(p.name.toLowerCase()));
  const saved = [...cart, ...wishlist];
  const preferred = new Set(saved.map(p=>p.category));
  const battery = /battery|backup/.test(q);
  const cheap = /cheap|lowest price|affordable/.test(q);
  if (!category && budget === null && !named.length && !personal && !/best|recommend|suggest|top rated|battery|cheap|affordable/.test(q)) return { text: "I can help with catalog products, prices, ratings, battery scores, and your cart or wishlist. Try asking for a laptop under ₹40,000." };
  let matches = products.filter(p => (!category || p.category === category) && (budget === null || Number(p.price) <= budget) && (!named.length || named.some(n=>same(n.id,p.id))));
  if (personal && preferred.size && !category && !named.length) {
    const alternatives = matches.filter(p => preferred.has(p.category) && !saved.some(s=>same(s.productId ?? s.id,p.id)));
    if (alternatives.length) matches = alternatives;
  }
  const score = p => Number(p.rating || 0)*10 + Number(p.batteryScore || 0)*(battery ? 15 : 1) + (p.bestSeller ? 2 : 0) + (personal && preferred.has(p.category) ? 12 : 0);
  matches.sort((a,b)=>cheap ? Number(a.price)-Number(b.price) : score(b)-score(a));
  if (!matches.length) return { text: "No products match those requirements. Try increasing your budget or choosing another category." };
  const p = matches[0];
  return { text: `${personal ? (preferred.size ? "Using your saved shopping interests, " : "Since you have no saved shopping interests yet, ") : ""}I recommend ${p.name} at ${money(p.price)}. It has a rating of ${p.rating}/5 and battery score of ${p.batteryScore}/10.${budget !== null ? ` It fits your ${money(budget)} budget.` : ""} Here are ${Math.min(matches.length,3)} matching options.`, products: matches.slice(0,3) };
}

export default function AIAssistant({ products = [] }) {
  const { cart, wishlist, addToCart, toggleWishlist, isWishlisted } = useCart();
  const [messages,setMessages] = useState(welcome);
  const [query,setQuery] = useState("");
  const [status,setStatus] = useState("");
  const recognitionRef = useRef(null);
  const endRef = useRef(null);
  useEffect(()=> { endRef.current?.scrollIntoView({block:"nearest",behavior:"smooth"}); },[messages]);
  useEffect(()=>()=>{ recognitionRef.current?.abort(); window.speechSynthesis?.cancel(); },[]);
  function send(value) {
    const text = value.trim(); if (!text) return;
    const reply = buildReply(text,products,cart,wishlist);
    setMessages(old=>[...old,{role:"user",text},{role:"assistant",...reply}]); setQuery(""); setStatus("");
  }
  function listen() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) { setStatus("Voice input is unavailable in this browser. Please type your question."); return; }
    if (recognitionRef.current) return;
    const r = new Recognition(); recognitionRef.current = r; r.lang="en-IN"; r.interimResults=false;
    r.onresult=e=>{ setQuery(e.results[0][0].transcript); setStatus("Voice captured. Press Send to ask."); };
    r.onerror=()=>setStatus("Voice input failed. Check microphone permission or type your question.");
    r.onend=()=>{ recognitionRef.current=null; setStatus(s=>s === "Listening…" ? "" : s); };
    try { setStatus("Listening…"); r.start(); } catch { recognitionRef.current=null; setStatus("Could not start microphone."); }
  }
  function speak(text) {
    if (!window.speechSynthesis) { setStatus("Voice output is unavailable."); return; }
    window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang="en-IN"; window.speechSynthesis.speak(utterance);
  }
  return <section className="page-container"><div className="container">
    <div className="page-heading"><h1>🤖 ShopSmart AI Assistant</h1><p>Personalized, rule-based shopping recommendations from our product catalog.</p></div>
    <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>{suggestions.map(s=><button key={s} type="button" className="btn btn-outline" onClick={()=>send(s)}>{s}</button>)}</div>
    <div style={{background:"white",border:"1px solid #e2e8f0",borderRadius:16,padding:16}}>
      <div role="log" aria-live="polite" style={{maxHeight:480,overflowY:"auto",display:"flex",flexDirection:"column",gap:14,padding:4}}>
        {messages.map((m,i)=><div key={i} style={{alignSelf:m.role==="user"?"flex-end":"flex-start",maxWidth:"95%",background:m.role==="user"?"#5945ff":"#f1f5f9",color:m.role==="user"?"white":"#0f172a",padding:14,borderRadius:12,overflowWrap:"anywhere"}}>
          <strong>{m.role==="user"?"You":"ShopSmart Assistant"}</strong><p style={{margin:"8px 0"}}>{m.text}</p>
          {m.role==="assistant" && <button type="button" className="btn btn-outline" onClick={()=>speak(m.text)}>🔊 Read aloud</button>}
          {m.products?.map(p=><div key={p.id} style={{background:"white",border:"1px solid #e2e8f0",borderRadius:8,padding:12,marginTop:10}}><strong>{p.name}</strong><p>{money(p.price)} · ⭐ {p.rating} · Battery {p.batteryScore}/10</p><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><Link className="btn btn-outline" to={`/products/${p.id}`}>View Details</Link><button type="button" className="btn btn-primary" onClick={()=>setStatus(addToCart(p)?`${p.name} added to cart.`:"Unable to add product.")}>Add to Cart</button><button type="button" className="btn btn-outline" onClick={()=>toggleWishlist(p)}>{isWishlisted(p.id)?"Remove from Wishlist":"Add to Wishlist"}</button></div></div>)}
        </div>)}<div ref={endRef}/>
      </div>
      <form onSubmit={e=>{e.preventDefault();send(query);}} style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:16}}><input aria-label="Shopping question" className="search-input" style={{flex:"1 1 220px"}} value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ask for a product or budget…"/><button type="submit" className="btn btn-primary" disabled={!query.trim()}>Send</button><button type="button" className="btn btn-outline" onClick={listen}>🎤 Voice</button><button type="button" className="btn btn-outline" onClick={()=>{recognitionRef.current?.abort();window.speechSynthesis?.cancel();setMessages(welcome());setQuery("");setStatus("");}}>Clear Chat</button></form>
      {status && <p role="status" style={{marginTop:10}}>{status}</p>}
    </div><p style={{marginTop:16}}><Link to="/products">← Back to Products</Link></p>
  </div></section>;
}