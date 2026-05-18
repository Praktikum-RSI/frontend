export function FooterSection() {
  return (
    <footer className="border-t border-border py-12 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 className="font-bold text-foreground mb-4">P!NGFEST</h4>
          <p className="text-sm text-foreground/70">Your premium gate to world-class experiences.</p>
        </div>
        {[
          { title: "Product", links: ["Features", "Pricing", "Security"] },
          { title: "Company", links: ["About", "Blog", "Careers"] },
          { title: "Legal", links: ["Privacy", "Terms", "Support"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-bold text-foreground mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-8">
        <p className="text-center text-sm text-foreground/70">© 2026 P!NGFEST. All rights reserved.</p>
      </div>
    </footer>
  );
}
