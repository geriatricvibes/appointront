import { useRoute } from 'vue-router'

export function useMeta() {
  const updateMeta = (metadata) => {
    // Update title
    document.title = metadata.title || 'GeriatricWriters - Redefining reading and writing'
    
    // Update meta description
    let descriptionMeta = document.querySelector('meta[name="description"]')
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta')
      descriptionMeta.setAttribute('name', 'description')
      document.head.appendChild(descriptionMeta)
    }
    descriptionMeta.setAttribute('content', metadata.description || '')
    
    // Update other meta tags
    if (metadata.meta) {
      metadata.meta.forEach(meta => {
        let metaTag = document.querySelector(`meta[${meta.property ? 'property' : 'name'}="${meta.property || meta.name}"]`)
        if (!metaTag) {
          metaTag = document.createElement('meta')
          metaTag.setAttribute(meta.property ? 'property' : 'name', meta.property || meta.name)
          document.head.appendChild(metaTag)
        }
        metaTag.setAttribute('content', meta.content)
      })
    }
  }

  return {
    updateMeta
  }
}