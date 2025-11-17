import { PostList } from '@/components/post-list';
import { siteConfig } from '@/config/site';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {siteConfig.homepage.title}
        </h1>
        <p className="text-lg text-[rgb(var(--muted-foreground))]">
          {siteConfig.homepage.subtitle}
        </p>
      </div>

      <PostList />
    </div>
  );
}
