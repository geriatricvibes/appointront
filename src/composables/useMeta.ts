
interface MetaTag {
  property?: string;
  name?: string;
  content: string;
}

interface Metadata {
  title?: string;
  description?: string;
  meta?: MetaTag[];
}

export function useMeta() {
  const updateMeta = (metadata: Metadata): void => {
    // Update title
    document.title = metadata.title || 'JustBookMe - Intelligent Appointment Scheduling'
    
    // Update meta description
    let descriptionMeta = document.querySelector('meta[name="description"]')
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta')
      descriptionMeta.setAttribute('name', 'description')
      document.head.appendChild(descriptionMeta)
    }
    descriptionMeta.setAttribute('content', metadata.description || 'Streamlining appointments and customer engagement through intelligent automation.')
    
    // Update other meta tags
    if (metadata.meta) {
      metadata.meta.forEach(meta => {
        const propOrName = meta.property || meta.name;
        if (!propOrName) return; // Skip if neither property nor name is defined
        
        let metaTag = document.querySelector(`meta[${meta.property ? 'property' : 'name'}="${propOrName}"]`);
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.setAttribute(meta.property ? 'property' : 'name', propOrName);
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute('content', meta.content);
      });
    }
  }

  return {
    updateMeta
  }
}