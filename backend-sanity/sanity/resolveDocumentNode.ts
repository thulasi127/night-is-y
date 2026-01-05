import { DefaultDocumentNodeResolver } from 'sanity/desk'
import ReadOnlyNotice from '../components/ReadOnlyNotice'

export const resolveDocumentNode: DefaultDocumentNodeResolver = (S, context) => {
  const views = [S.view.form().title('Editor')]

  const isPublished = context.document?.displayed?._id &&
    !context.document.displayed._id.startsWith('drafts.')

  if (isPublished) {
    views.push(
      S.view
        .component(ReadOnlyNotice)
        .title('Read Only')
    )
  }

  return S.document().views(views)
}