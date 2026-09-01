import React, {
  useState,
} from "react";

function SearchBar({
  onSearch,
}) {
  const [
    searchText,
    setSearchText,
  ] = useState("");

  const [
    listening,
    setListening,
  ] = useState(false);

  const handleChange = (
    event
  ) => {
    const value =
      event.target.value;

    setSearchText(value);

    // If user completely
    // removes search text,
    // automatically show all
    if (!value.trim()) {
      onSearch("");
    }
  };

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    onSearch(searchText);
  };

  const startVoiceSearch =
    () => {
      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert(
          "Voice Search is not supported in this browser. Please use Google Chrome."
        );

        return;
      }

      const recognition =
        new SpeechRecognition();

      recognition.lang =
        "en-IN";

      recognition.interimResults =
        false;

      recognition.continuous =
        false;

      recognition.onstart =
        () => {
          setListening(true);
        };

      recognition.onend =
        () => {
          setListening(false);
        };

      recognition.onerror =
        (event) => {
          console.error(
            "Voice recognition error:",
            event.error
          );

          setListening(false);
        };

      recognition.onresult =
        (event) => {
          const spokenText =
            event.results[0][0]
              .transcript;

          setSearchText(
            spokenText
          );

          onSearch(
            spokenText
          );
        };

      recognition.start();
    };

  return (
    <form
      className="smart-search"
      onSubmit={
        handleSubmit
      }
    >
      <input
        type="text"
        value={searchText}
        onChange={
          handleChange
        }
        placeholder="Try: laptop under ₹40000 with best battery"
      />

      <button
        type="button"
        className={
          listening
            ? "voice-button listening"
            : "voice-button"
        }
        onClick={
          startVoiceSearch
        }
      >
        {listening
          ? "🎙️ Listening..."
          : "🎤 Voice Search"}
      </button>

      <button
        type="submit"
        className="smart-search-button"
      >
        ✨ Smart Search
      </button>

    </form>
  );
}

export default SearchBar;