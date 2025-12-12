// sanity/deskStructure.ts
import { StructureBuilder } from 'sanity/desk'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
            .views([
              S.view.form().title('Editor'), // Only show the form view (hides Review changes)
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Project Menu')
        .schemaType('projectMenu')
        .child(S.documentTypeList('projectMenu').title('Project Categories')),
    ])
