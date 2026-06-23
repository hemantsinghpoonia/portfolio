import Image from "next/image";
import { urlFor, type BodyImage } from "@repo/sanity-schema";

const LAYOUT_CLASSES: Record<BodyImage["layout"], string> = {
  contained: "",
  wide: "lg:-mx-12",
  full: "lg:-mx-[max(0px,calc((100vw-100%)/2))] lg:w-[100vw] lg:max-w-none",
};

export function BodyImageRenderer({ value }: { value: BodyImage }) {
  const imageUrl = urlFor(value).width(1600).fit("max").auto("format").url();

  return (
    <figure className={`not-prose my-8 ${LAYOUT_CLASSES[value.layout] ?? ""}`}>
      <Image
        src={imageUrl}
        alt={value.alt}
        width={1600}
        height={900}
        sizes="(min-width: 1024px) 80vw, 100vw"
        className="h-auto w-full rounded-lg border border-border-subtle"
      />
      {value.caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
