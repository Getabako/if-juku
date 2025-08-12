/**
 * カテゴリ別記事データの読み込みユーティリティ
 */

// Static imports for index files
import { POSTS_INDEX, NEWS_INDEX, MATERIALS_INDEX } from '../data/staticData';

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  link: string;
  date: string;
  author: string;
  categories: string[];
}

export interface CategoryIndex {
  category: string;
  posts: {
    id: number;
    title: string;
    filename: string;
    date: string;
    author?: string;
    excerpt?: string;
  }[];
  total?: number;
  updated_at?: string;
}

export interface MainIndex {
  posts: {
    id: number;
    title: string;
    date: string;
    category: string;
    excerpt: string;
  }[];
  categories: string[];
  total: number;
}

// カテゴリインデックスのマップ
const categoryIndexMap: { [key: string]: any } = {
  'minecraft': MATERIALS_INDEX,
  'news': NEWS_INDEX,
  'blog': { category: 'blog', posts: [] },
  'ai-lectures': { category: 'ai-lectures', posts: [] },
  'others': { category: 'others', posts: [] }
};

// カテゴリインデックスを取得する関数
export const loadCategoryIndex = async (category: string): Promise<CategoryIndex> => {
  try {
    const index = categoryIndexMap[category];
    if (index) {
      return index;
    }
    console.error(`Category index not found for ${category}`);
    return {
      category,
      posts: [],
      total: 0,
      updated_at: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Failed to load category index for ${category}:`, error);
    return {
      category,
      posts: [],
      total: 0,
      updated_at: new Date().toISOString()
    };
  }
};

export const loadMainIndex = async (): Promise<MainIndex> => {
  try {
    return POSTS_INDEX as MainIndex;
  } catch (error) {
    console.error('Failed to load main index:', error);
    return {
      posts: [],
      categories: [],
      total: 0
    };
  }
};

// マインクラフト関連の記事を取得（教材用）
export const loadMaterialPosts = async (limit: number = 12): Promise<Post[]> => {
  try {
    // 全カテゴリからマインクラフト関連記事を取得
    const othersIndex = await loadCategoryIndex('others');
    const blogIndex = await loadCategoryIndex('blog');
    
    // マインクラフト関連の記事をフィルタリング
    const minecraftPosts = [
      ...othersIndex.posts.filter(post => 
        post.title.includes('Minecraft') ||
        post.title.includes('minecraft') ||
        post.title.includes('マイクラ') ||
        post.title.includes('コマンド') ||
        post.title.includes('fill') ||
        post.title.includes('summon') ||
        post.title.includes('effect') ||
        post.title.includes('give') ||
        post.title.includes('kill') ||
        post.title.includes('gamemode') ||
        post.title.includes('gamerule') ||
        post.title.includes('tellraw') ||
        post.title.includes('title') ||
        post.title.includes('clear')
      ),
      ...blogIndex.posts.filter(post => 
        post.title.includes('Minecraft') ||
        post.title.includes('minecraft') ||
        post.title.includes('マイクラ')
      )
    ];
    
    // 日付でソート（新しい順）
    minecraftPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // 上位N件を取得し、詳細データを読み込み
    const topPosts = minecraftPosts.slice(0, limit);
    const detailedPosts: Post[] = [];
    
    for (const post of topPosts) {
      try {
        // カテゴリを推測
        let category = 'others';
        if (blogIndex.posts.some(p => p.id === post.id)) category = 'blog';
        
        const module = await import(`../data/posts/${category}/${post.filename}`);
        detailedPosts.push(module.default);
      } catch (error) {
        console.error(`Failed to load post details for ${post.filename}:`, error);
      }
    }
    
    return detailedPosts;
  } catch (error) {
    console.error('Failed to load material posts:', error);
    return [];
  }
};

// ニュース関連の記事を取得（マインクラフト以外）
export const loadNewsPosts = async (limit: number = 12): Promise<Post[]> => {
  try {
    const aiLecturesIndex = await loadCategoryIndex('ai-lectures');
    const blogIndex = await loadCategoryIndex('blog');
    const othersIndex = await loadCategoryIndex('others');
    
    // マインクラフト以外の記事を取得
    const newsPosts = [
      ...aiLecturesIndex.posts,
      ...blogIndex.posts.filter(post => 
        !post.title.includes('Minecraft') &&
        !post.title.includes('minecraft') &&
        !post.title.includes('マイクラ')
      ),
      ...othersIndex.posts.filter(post => 
        !post.title.includes('Minecraft') &&
        !post.title.includes('minecraft') &&
        !post.title.includes('マイクラ') &&
        !post.title.includes('コマンド') &&
        !post.title.includes('fill') &&
        !post.title.includes('summon') &&
        !post.title.includes('effect') &&
        !post.title.includes('give') &&
        !post.title.includes('kill') &&
        !post.title.includes('gamemode') &&
        !post.title.includes('gamerule') &&
        !post.title.includes('tellraw') &&
        !post.title.includes('title') &&
        !post.title.includes('clear') &&
        (
          post.title.includes('紹介') ||
          post.title.includes('参加') ||
          post.title.includes('開催') ||
          post.title.includes('取り組み') ||
          post.title.includes('採択') ||
          post.title.includes('if(塾)') ||
          post.title.includes('塾長') ||
          post.title.includes('塾頭') ||
          post.title.includes('イベント') ||
          post.title.includes('大学') ||
          post.title.includes('夢') ||
          post.title.includes('話')
        )
      )
    ];
    
    // 日付でソート（新しい順）
    newsPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // 上位N件を取得し、詳細データを読み込み
    const topPosts = newsPosts.slice(0, limit);
    const detailedPosts: Post[] = [];
    
    for (const post of topPosts) {
      try {
        // カテゴリを推測
        let category = 'others';
        if (aiLecturesIndex.posts.some(p => p.id === post.id)) category = 'ai-lectures';
        else if (blogIndex.posts.some(p => p.id === post.id)) category = 'blog';
        
        const module = await import(`../data/posts/${category}/${post.filename}`);
        detailedPosts.push(module.default);
      } catch (error) {
        console.error(`Failed to load post details for ${post.filename}:`, error);
      }
    }
    
    return detailedPosts;
  } catch (error) {
    console.error('Failed to load news posts:', error);
    return [];
  }
};

// 記事IDからカテゴリーを特定する関数
export const findPostCategory = async (postId: number): Promise<string | null> => {
  const categories = ['minecraft', 'news', 'blog', 'ai-lectures', 'others'];
  
  for (const category of categories) {
    try {
      const categoryIndex = await loadCategoryIndex(category);
      const post = categoryIndex.posts.find(p => p.id === postId);
      if (post) {
        return category;
      }
    } catch (error) {
      console.error(`Failed to check category ${category}:`, error);
    }
  }
  
  return null;
};

// 記事IDから詳細データを取得する関数
export const loadPostById = async (postId: number): Promise<Post | null> => {
  try {
    const category = await findPostCategory(postId);
    if (!category) {
      console.error(`Post with ID ${postId} not found in any category`);
      return null;
    }
    
    const categoryIndex = await loadCategoryIndex(category);
    const postMeta = categoryIndex.posts.find(p => p.id === postId);
    if (!postMeta) {
      console.error(`Post metadata for ID ${postId} not found`);
      return null;
    }
    
    const module = await import(`../data/posts/${category}/${postMeta.filename}`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load post with ID ${postId}:`, error);
    return null;
  }
};

// 全カテゴリの記事を取得
export const loadAllPosts = async (limit?: number): Promise<Post[]> => {
  try {
    const mainIndex = await loadMainIndex();
    const allPosts: Post[] = [];
    
    // 全カテゴリから記事を取得
    for (const categoryName of mainIndex.categories) {
      const categoryIndex = await loadCategoryIndex(categoryName);
      
      for (const post of categoryIndex.posts) {
        try {
          const module = await import(`../data/posts/${categoryName}/${post.filename}`);
          allPosts.push(module.default);
        } catch (error) {
          console.error(`Failed to load post ${post.filename}:`, error);
        }
      }
    }
    
    // 日付でソート（新しい順）
    allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return limit ? allPosts.slice(0, limit) : allPosts;
  } catch (error) {
    console.error('Failed to load all posts:', error);
    return [];
  }
};