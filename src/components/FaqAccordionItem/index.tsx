import BouncyAccordionRow from "../../sub-components/BouncyAccordionRow";
import { Props } from "./types";

export function FaqAccordionItem({ icon, question, answer }: Props) {
  if (!question) return null;

  return (
    <BouncyAccordionRow
      icon={icon}
      question={question}
      answer={answer}
    />
  );
}

export default FaqAccordionItem;
