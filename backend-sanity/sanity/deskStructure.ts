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

        S.divider(),

      S.listItem()
        .title('About NIY')
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

      S.listItem()
        .title('About Team Members')
        .child(
          S.list()
            .title('Team Profiles')
            .items([
              S.listItem()
                .title('Devery Jacobs')
                .child(
                  S.document()
                    .schemaType('teamMember')
                    .documentId('team-devery')
                ),

              S.listItem()
                .title('D.W. Waterson')
                .child(
                  S.document()
                    .schemaType('teamMember')
                    .documentId('team-dw')
                ),
            ])
        )
    ])
