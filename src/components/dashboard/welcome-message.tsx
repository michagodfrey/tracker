// src/components/dashboard/welcome-message.tsx
export function WelcomeMessage({ name }: { name?: string | null }) {
  const timeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  return (
    <h1 className="text-3xl font-bold tracking-tight">
      Good {timeOfDay()}, {name || "there"}
    </h1>
  );
}
