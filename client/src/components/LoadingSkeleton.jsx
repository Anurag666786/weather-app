function LoadingSkeleton() {
  return (
    <div className="w-full max-w-md mt-10 p-8 rounded-3xl 
                    bg-white/70 dark:bg-white/10 
                    backdrop-blur-xl 
                    border border-white/30 
                    animate-pulse">
      <div className="h-6 bg-gray-300 dark:bg-white/20 rounded mb-6"></div>
      <div className="h-20 bg-gray-300 dark:bg-white/20 rounded mb-6"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-12 bg-gray-300 dark:bg-white/20 rounded"></div>
        <div className="h-12 bg-gray-300 dark:bg-white/20 rounded"></div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;