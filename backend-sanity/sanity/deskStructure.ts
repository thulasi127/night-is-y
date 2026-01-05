// sanity/deskStructure.ts
import { StructureBuilder } from 'sanity/desk'
import ReadOnlyNotice from '../components/ReadOnlyNotice'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .schemaType('homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
            .views([S.view.form().title('Editor')])
        ),
      S.listItem()
        .title('About Page')
        .schemaType('about')
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
            .views([
              S.view.form().title('Editor'),
              S.view.component(ReadOnlyNotice).title('Instructions'),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Project Menu')
        .schemaType('projectMenu')
        .child(S.documentTypeList('projectMenu').title('Project Categories')),
    ])
