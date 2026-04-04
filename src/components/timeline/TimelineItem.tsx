import Image from "next/image";
import { ImpactUpdate } from "@/constants/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, ShoppingCart } from "lucide-react";

interface TimelineItemProps {
  update: ImpactUpdate;
  isEven?: boolean;
}

const getIcon = (type: ImpactUpdate["type"]) => {
  switch (type) {
    case "logistics":
      return <Package className="h-5 w-5" />;
    case "delivery":
      return <Truck className="h-5 w-5" />;
    case "purchase":
      return <ShoppingCart className="h-5 w-5" />;
  }
};

const getTypeColor = (type: ImpactUpdate["type"]) => {
  switch (type) {
    case "logistics":
      return "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200";
    case "delivery":
      return "bg-green-100 text-green-700 hover:bg-green-200 border-green-200";
    case "purchase":
      return "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200";
  }
};

export function TimelineItem({ update, isEven }: TimelineItemProps) {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
      {/* Icon Node */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-secondary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
        <div className="text-secondary-foreground">{getIcon(update.type)}</div>
      </div>

      {/* Card */}
      <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start mb-2 gap-4">
            <Badge variant="outline" className={getTypeColor(update.type)}>
              {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
            </Badge>
            <time className="text-xs text-muted-foreground whitespace-nowrap">
              {new Date(update.createdAt).toLocaleDateString()}
            </time>
          </div>
          <CardTitle className="text-lg">{update.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {update.description}
          </p>
          
        </CardContent>
      </Card>
    </div>
  );
}
