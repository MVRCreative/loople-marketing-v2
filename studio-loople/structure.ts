import type { StructureResolver } from 'sanity/structure';

// Groups the Studio desk into Features, Resources by category, Careers, and Authors.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Features')
        .schemaType('feature')
        .child(S.documentTypeList('feature').title('Features')),
      S.divider(),
      S.listItem()
        .title('Docs')
        .child(
          S.list()
            .title('Docs')
            .items([
              S.listItem()
                .title('Categories')
                .schemaType('docCategory')
                .child(
                  S.documentTypeList('docCategory')
                    .title('Categories')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),
              S.listItem()
                .title('Features by category')
                .child(
                  S.documentTypeList('docCategory')
                    .title('Features by category')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                    .child((categoryId) =>
                      S.documentList()
                        .title('Features')
                        .schemaType('docFeature')
                        .filter('_type == "docFeature" && category._ref == $categoryId')
                        .params({ categoryId })
                        .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                    ),
                ),
              S.listItem()
                .title('All features')
                .schemaType('docFeature')
                .child(S.documentTypeList('docFeature').title('All features')),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Resources')
        .child(
          S.list()
            .title('Resources')
            .items([
              S.listItem()
                .title('All resources')
                .schemaType('resource')
                .child(S.documentTypeList('resource').title('All resources')),
              S.divider(),
              S.listItem()
                .title('Blog')
                .schemaType('resource')
                .child(
                  S.documentList()
                    .title('Blog')
                    .filter('_type == "resource" && category == $category')
                    .params({ category: 'blog' }),
                ),
              S.listItem()
                .title('Case studies')
                .schemaType('resource')
                .child(
                  S.documentList()
                    .title('Case studies')
                    .filter('_type == "resource" && category == $category')
                    .params({ category: 'caseStudy' }),
                ),
              S.listItem()
                .title('Tutorials')
                .schemaType('resource')
                .child(
                  S.documentList()
                    .title('Tutorials')
                    .filter('_type == "resource" && category == $category')
                    .params({ category: 'tutorial' }),
                ),
              S.listItem()
                .title('News')
                .schemaType('resource')
                .child(
                  S.documentList()
                    .title('News')
                    .filter('_type == "resource" && category == $category')
                    .params({ category: 'news' }),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Careers')
        .schemaType('jobPosting')
        .child(S.documentTypeList('jobPosting').title('Job postings')),
      S.listItem()
        .title('Authors')
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),
    ]);
