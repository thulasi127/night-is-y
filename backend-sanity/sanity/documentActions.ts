// backend-sanity/sanity/documentActions.ts
import { DocumentActionComponent } from 'sanity'

export const documentActions: DocumentActionComponent[] = (prev, context) => {
  const isPublished = context?.document?.published && !context?.document?.draft

  if (isPublished) {
    return prev.filter(
      (action) =>
        action.action !== 'publish' &&
        action.action !== 'discardChanges' &&
        action.action !== 'delete' &&
        action.action !== 'restore' &&
        action.action !== 'unpublish'
    )
  }

  return prev
}
