import { Github, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Support Buttons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/skarthikeyan96/blog-stats-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
            >
              <Github className="w-4 h-4" />
              Star on GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.producthunt.com/posts/blog-stats-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all text-sm font-medium"
            >
              🚀 Product Hunt
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-slate-500 text-center">
            MIT License • Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
