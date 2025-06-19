import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EventScreenProps {
  onContinue: () => void;
}

export const EventScreen = ({ onContinue }: EventScreenProps) => {
  const events = [
    "A major tech blog wants to feature your startup!",
    "Your competitor just raised $2M in funding.",
    "A key team member is considering leaving.",
    "You received positive feedback from early users.",
    "Server costs are increasing due to growth."
  ];
  
  const randomEvent = events[Math.floor(Math.random() * events.length)];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>📰 Breaking News</CardTitle>
        <CardDescription>{randomEvent}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onContinue} className="w-full">
          Continue
        </Button>
      </CardContent>
    </Card>
  );
};