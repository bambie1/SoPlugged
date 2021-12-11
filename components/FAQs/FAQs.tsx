import { FC, useState } from "react";

import { faqs } from "@/lib/faqs";

import styles from "./FAQs.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  question: string;
  answer: string;
}

const Accordion: FC<Props> = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAccordion = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <article key={question}>
      <button className={styles.accordion} onClick={handleAccordion}>
        {question}
        <FontAwesomeIcon icon={showAnswer ? faMinus : faPlus} />
      </button>

      {showAnswer && (
        <div className={styles.panel}>
          <p>{answer}</p>
        </div>
      )}
    </article>
  );
};

const FAQs: FC = () => {
  return (
    <section className={styles.faqs}>
      <h2 className="center">FAQs</h2>

      {faqs.map(({ question, answer }) => (
        <Accordion key={question} question={question} answer={answer} />
      ))}
    </section>
  );
};

export default FAQs;
