// https://vike.dev/Head
import "./tailwind.css"
import logoUrl from "../assets/logo.svg";

export function Head() {
  return <link rel="icon" href={logoUrl} />;
}
