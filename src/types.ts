export type State = {
  alder?: number;
  forrigeValg?: string;
  kommune?: string;
  fornoyd?: "Ja" | "Nei";
  nesteValg?: string;
}

export type StepProps = {
  forwardButtonLabel?: string;
}
