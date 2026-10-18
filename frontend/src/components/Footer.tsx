const links = [
  { label: "github", href: "https://github.com/logansundaram" },
  { label: "email", href: "mailto:logantechwork@gmail.com" },
  { label: "linkedin", href: "https://www.linkedin.com/in/logan-s-6b5805251" },
  { label: "saturday.ai", href: "https://saturdayai.org" },
];

export const Footer = () => {
  return (
    <footer className="mx-25 border-t border-zinc-700 pt-6 pb-10 text-sm text-zinc-500">
      <div className="flex flex-wrap gap-x-10 gap-y-2">
        <span>contact:</span>
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
            className="text-zinc-400 hover:text-amber-500"
          >
            [ {label} ]
          </a>
        ))}
      </div>
    </footer>
  );
};
