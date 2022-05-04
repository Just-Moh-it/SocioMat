import { useState } from "react";

const ReadMore = ({ maxLength, text }) => {
  const [isReadingMore, setIsReadingMore] = useState(false);

  return (
    <p>
      {isReadingMore ? text : text.slice(0, maxLength)}{" "}
      {text.length > maxLength && (
        <span
          role="button"
          className="text-secondary text-large"
          onClick={() => setIsReadingMore(!isReadingMore)}
        >
          {isReadingMore ? "↑ Read Less" : "↓ Read More"}
        </span>
      )}
    </p>
  );
};

export default ReadMore;
