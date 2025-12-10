// sanity/deskStructure.ts
import { StructureBuilder } from 'sanity/desk'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Force a single Homepage document
      S.documentListItem()
        .title('Homepage')
        .schemaType('homepage')
        .id('homepage'),
    ])
