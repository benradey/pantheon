package com.redhat.pantheon.model.document;

import com.redhat.pantheon.model.api.Child;
import com.redhat.pantheon.model.api.Field;
import com.redhat.pantheon.model.api.FileResource;
import com.redhat.pantheon.model.api.WorkspaceChild;

import javax.annotation.Nonnull;
import javax.inject.Named;
import java.util.Locale;
import java.util.Optional;

import static com.redhat.pantheon.model.api.util.ResourceTraversal.traverseFrom;

public interface Document extends WorkspaceChild {

    @Named("jcr:uuid")
    Field<String> uuid();

    Child<? extends DocumentLocale> getLocale(Locale locale);

//    default Optional<DocumentVersion> getDraftVersion(@Nonnull final Locale locale,
//                                                    @Nonnull final String variantName) {
//        return traverseFrom(this)
//                .toChild(m -> m.getLocale(locale))
//                .toChild(DocumentLocale::variants)
//                .toChild(variants -> variants.variant(variantName))
//                .toChild(DocumentVariant::draft)
//                .getAsOptional();
//    }
//
//    default Optional<DocumentVersion> getReleasedVersion(@Nonnull final Locale locale,
//                                                       @Nonnull final String variantName) {
//        return traverseFrom(this)
//                .toChild(m -> m.getLocale(locale))
//                .toChild(DocumentLocale::variants)
//                .toChild(variants -> variants.variant(variantName))
//                .toChild(DocumentVariant::released)
//                .getAsOptional();
//    }
//
//    /**
//     * @param locale The locale to fetch the content instance for.
//     * @param variantName
//     * @return The draft content for a given locale
//     */
//    default Optional<FileResource> getDraftContent(final Locale locale,
//                                                   @Nonnull final String variantName) {
//        return traverseFrom(this)
//                .toChild(m -> m.getLocale(locale))
//                .toChild(DocumentLocale::variants)
//                .toChild(variants -> variants.variant(variantName))
//                .toChild(DocumentVariant::draft)
//                .toChild(DocumentVersion::cachedHtml)
//                .getAsOptional();
//
//    /**
//     * @param locale The locale to fetch the content instance for.
//     * @param variantName
//     * @return The released content for a given locale
//     */
//    default Optional<FileResource> getReleasedContent(final Locale locale,
//                                                      @Nonnull final String variantName) {
//        return traverseFrom(this)
//                .toChild(m -> m.getLocale(locale))
//                .toChild(DocumentLocale::variants)
//                .toChild(variants -> variants.variant(variantName))
//                .toChild(DocumentVariant::released)
//                .toChild(DocumentVersion::cachedHtml)
//                .getAsOptional();
//    }
//    }
//
//    /**
//     * @param locale The locale to fetch the content instance for.
//     * @param variantName
//     * @return The draft metadata for a given locale
//     */
//    default Optional<DocumentMetadata> getDraftMetadata(final Locale locale,
//                                                        @Nonnull final String variantName) {
//        return traverseFrom(this)
//                .toChild(m -> m.getLocale(locale))
//                .toChild(DocumentLocale::variants)
//                .toChild(variants -> variants.variant(variantName))
//                .toChild(DocumentVariant::draft)
//                .toChild(DocumentVersion::metadata)
//                .getAsOptional();
//    }
//
//    /**
//     * @param locale The locale to fetch the content instance for.
//     * @param variantName
//     * @return The released metadata for a given locale
//     */
//    default Optional<DocumentMetadata> getReleasedMetadata(final Locale locale,
//                                                         @Nonnull final String variantName) {
//        return traverseFrom(this)
//                .toChild(m -> m.getLocale(locale))
//                .toChild(DocumentLocale::variants)
//                .toChild(variants -> variants.variant(variantName))
//                .toChild(DocumentVariant::released)
//                .toChild(DocumentVersion::metadata)
//                .getAsOptional();
//    }
//
//    /**
//     *
//     * @param locale the locale to fetch the status content
//     * @param variantName
//     * @return the  status data for a draft version for a given locale
//     */
//    default Optional<AckStatus> getDraftAcknowledgementStatus(final Locale locale,
//                                                              @Nonnull final String variantName) {
//        // Ben: Why do we have this method? The only time a document will be 'acknowledged' is after
//        // it's been published...??
//
//        return traverseFrom(this)
//                .toChild(m -> m.getLocale(locale))
//                .toChild(DocumentLocale::variants)
//                .toChild(variants -> variants.variant(variantName))
//                .toChild(DocumentVariant::draft)
//                .toChild(DocumentVersion::ackStatus)
//                .getAsOptional();
//    }
//
//    /**
//     *
//     * @param locale the locale to fetch the acknowledgment status content
//     * @param variantName
//     * @return the  status data for a released version for a given locale
//     */
//    default Optional<AckStatus> getAcknowledgementStatus(final Locale locale,
//                                                         @Nonnull final String variantName) {
//        return traverseFrom(this)
//                .toChild(m -> m.getLocale(locale))
//                .toChild(DocumentLocale::variants)
//                .toChild(variants -> variants.variant(variantName))
//                .toChild(DocumentVariant::released)
//                .toChild(DocumentVersion::ackStatus)
//                .getAsOptional();
//    }
}
