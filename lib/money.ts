export function formatXOF(amount: number) {
  // affichage style "59 000 F CFA"
  const s = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${s} F CFA`;
}
