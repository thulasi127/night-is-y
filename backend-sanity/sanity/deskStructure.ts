// sanity/deskStructure.ts
import { StructureBuilder } from 'sanity/desk'
import ReadOnlyNotice from '../components/ReadOnlyNotice'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // ----------------
      // Homepage
      // ----------------
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

      // ----------------
      // About
      // ----------------
      S.listItem()
        .title('About')
        .child(
          S.list()
            .title('About Pages')
            .items([
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
                .title('Team Members')
                .child(
                  S.list()
                    .title('Team Members')
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
                ),
            ])
        ),

      S.divider(),

      // ----------------
      // Projects
      // ----------------
      S.listItem()
        .title('Projects')
        .child(
          S.list()
            .title('Project Pages')
            .items([
              S.listItem()
                .title('Project Menu')
                .schemaType('projectMenu')
                .child(
                  S.document()
                    .schemaType('projectMenu')
                    .documentId('project-menu')
                ),

              S.listItem()
                .title('Film & Series')
                .schemaType('filmSeries')
                .child(
                  S.document()
                    .schemaType('filmSeries')
                    .documentId('film-series-page')
                ),

              S.listItem()
                .title('Music Videos')
                .schemaType('musicVideos')
                .child(
                  S.document()
                    .schemaType('musicVideos')
                    .documentId('music-videos-page')
                ),

              S.listItem()
                .title('In Development')
                .schemaType('development')
                .child(
                  S.document()
                    .schemaType('development')
                    .documentId('development-page')
                ),
            ])
        ),

      S.divider(),

      // ----------------
      // Press
      // ----------------
      S.listItem()
        .title('Press')
        .schemaType('press')
        .child(
          S.document()
            .schemaType('press')
            .documentId('press-page')
        ),

      S.divider(),

      // ----------------
      // Contact
      // ----------------
      S.listItem()
        .title('Contact')
        .schemaType('contact')
        .child(
          S.document()
            .schemaType('contact')
            .documentId('contact-page')
        ),
    ])
