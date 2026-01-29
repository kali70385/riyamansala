interface AdSpaceProps {
  variant: "leaderboard" | "inline";
  className?: string;
}

const AdSpace = ({ variant, className = "" }: AdSpaceProps) => {
  if (variant === "leaderboard") {
    // Mobile leaderboard: 320x50 or 320x100
    return (
      <div className={`w-full flex justify-center py-3 ${className}`}>
        <div className="bg-muted border border-border rounded-lg flex items-center justify-center w-[320px] h-[50px] md:w-[728px] md:h-[90px]">
          <span className="text-xs text-muted-foreground">Advertisement</span>
        </div>
      </div>
    );
  }

  // Inline ad between cards: 300x250 (medium rectangle)
  return (
    <div className={`w-full flex justify-center py-4 ${className}`}>
      <div className="bg-muted border border-border rounded-lg flex items-center justify-center w-[300px] h-[250px]">
        <span className="text-xs text-muted-foreground">Advertisement</span>
      </div>
    </div>
  );
};

export default AdSpace;
