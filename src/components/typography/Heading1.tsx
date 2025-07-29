const Heading1 = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h1 className={`text-3xl lg:text-4xl font-bold ${className}`}>
    {children}
  </h1>
);

export default Heading1