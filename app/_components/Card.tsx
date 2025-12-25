import { CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Card as UiCard } from "@/components/ui/card";

function Card() {
  return (
    <section className="bg-neutral-900/50 py-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {[
          "Individuelle Maße",
          "Flexible Farbwahl",
          "Direkter Herstellerkontakt",
        ].map((item) => (
          <UiCard key={item} className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 my-4">
                <Check className="text-neutral-200" />
                <h3 className="font-semibold text-lg text-neutral-200">
                  {item}
                </h3>
              </div>
              <p className="mt-2 text-sm text-neutral-400">
                Maßgeschneiderte Lösungen ohne komplizierten Online - Shop.
              </p>
            </CardContent>
          </UiCard>
        ))}
      </div>
    </section>
  );
}

export default Card;
