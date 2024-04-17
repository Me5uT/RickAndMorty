import React from "react";
interface IBoldCertainLetters {
  text: string;
  boldLetters: string[];
}
export const BoldCertainLetters: React.FC<IBoldCertainLetters> = ({
  text,
  boldLetters,
}) => {
  // Belirli harfleri kalınlaştırmak için bir fonksiyon
  const renderTextWithBoldLetters = () => {
    const boldText = [];
    let index = 0;

    // Her harfi döngüye al
    for (let i = 0; i < text.length; i++) {
      const letter = text[i].toLocaleLowerCase();
      // Eğer harf boldLetters içindeyse, kalın biçimde render et
      if (boldLetters.includes(letter)) {
        boldText.push(<strong key={index}>{letter}</strong>);
      } else {
        boldText.push(letter);
      }
      index++;
    }

    return boldText;
  };

  return <div>{renderTextWithBoldLetters()}</div>;
};
