// ./document.actions.ts
import type { DocumentActionComponent, DocumentActionProps } from 'sanity'

export const resolveDocumentActions = (prev: DocumentActionComponent[]) => {
  return (props: DocumentActionProps) => {
    const { view, draft, published } = props

    // If you're in the "Published" perspective and the document is already published,
    // hide all editing actions
    if (view?.id === 'published' && published && !draft) {
      return []
    }

    // Otherwise, show all default actions
    return prev.map(Action => Action(props))
  }
}
