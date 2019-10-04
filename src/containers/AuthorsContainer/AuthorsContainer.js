import React from "react";
import Author from "../../components/Author";
import "./AuthorsContainer.scss";

const AuthorsContainer = props => {
  const { authors } = props;

  return (
    <div className="authors-main-container">
      <div className="authors-container">
        {authors.map(author => (
          <Author
            key={author.id}
            id={author.id}
            name={author.name}
            image={author.image}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(AuthorsContainer);
