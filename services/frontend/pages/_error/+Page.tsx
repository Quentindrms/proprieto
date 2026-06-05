import Heading from "@components/heading";
import Text from "@components/text";
import { Show } from "solid-js";
import { usePageContext } from "vike-solid/usePageContext";

export default function Page() {
  const { is404, abortReason, abortStatusCode } = usePageContext();
  return (
    <div class="w-full flex flex-col justify-center items-center gap-2">
      <Show
        when={is404}
        fallback={
          <>
            <h1>Internal Error</h1>
            <p>Something went wrong.</p>
          </>
        }
      >
        <Heading components="h2" size="extra-large">ERREUR 404</Heading>
        <Heading components="h2" size="extra-large">Une erreur est survenue</Heading>
        <Text size="extra-large">Cette page n'existe pas</Text>
      </Show>
    </div>
  );
}
