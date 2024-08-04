import CustomerCard from "@/app/ui/customer-card";
import { customerCards } from "@/app/lib/constants";

const customerCardsItems = customerCards.map((card) => (
  <CustomerCard key={card.id} src={card.src} alt={card.alt} />
));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-1 gap-y-6 gap-x-6 justify-items-center max-w-5xl md:flex-grow md:grid-cols-2    xl:grid-cols-3">
        {customerCardsItems}
      </div>
    </main>
  );
}
