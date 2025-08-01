import { Github, ExternalLink, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Project Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">
              Blog Stats Generator
            </h3>
            <p className="text-slate-600 text-sm">
              Generate beautiful statistics cards for your blog posts across
              multiple platforms.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by developers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a
                  href="#features"
                  className="hover:text-slate-900 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#themes"
                  className="hover:text-slate-900 transition-colors"
                >
                  Themes
                </a>
              </li>
              <li>
                <a
                  href="#api"
                  className="hover:text-slate-900 transition-colors"
                >
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Community</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a
                  href="https://github.com/skarthikeyan96/blog-stats-generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-slate-900 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub Repository
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/skarthikeyan96/blog-stats-generator/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors"
                >
                  Report Issues
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/skarthikeyan96/blog-stats-generator/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors"
                >
                  Discussions
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">
              Support the Project
            </h3>
            <div className="space-y-3">
              <a
                href="https://www.producthunt.com/posts/blog-stats-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all text-sm font-medium"
              >
                🚀 Product Hunt
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://github.com/skarthikeyan96/blog-stats-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
              >
                <Github className="w-4 h-4" />
                Star on GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2024 Blog Stats Generator. Open source project under MIT License.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <a
              href="#privacy"
              className="hover:text-slate-900 transition-colors"
            >
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
