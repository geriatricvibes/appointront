import { useMeta } from './useMeta'

interface MetaTag {
  property?: string;
  name?: string;
  content: string;
}

export function useCommonMeta() {
  const { updateMeta } = useMeta()
  
  const setPageMeta = (pageTitle?: string, pageDescription?: string): void => {
    const title = pageTitle ? `${pageTitle} | JustBookMe` : 'JustBookMe - Intelligent Appointment Scheduling'
    const description = pageDescription || 'Streamlining appointments and customer engagement through intelligent automation.'
    
    const metaTags: MetaTag[] = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: 'https://www.justbookme.ai/calendar-sync.png' },
      { property: 'og:url', content: 'https://www.justbookme.ai' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: 'https://www.justbookme.ai/calendar-sync.png' }
    ]
    
    updateMeta({
      title,
      description,
      meta: metaTags
    })
  }
  
  return {
    setPageMeta
  }
} 