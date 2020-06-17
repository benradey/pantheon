package com.redhat.pantheon.servlet;

import com.redhat.pantheon.asciidoctor.AsciidoctorService;
<<<<<<< HEAD:pantheon-bundle/src/main/java/com/redhat/pantheon/servlet/ModuleRendererServlet.java
import com.redhat.pantheon.helper.PantheonConstants;
=======
import com.redhat.pantheon.model.Rendering;
import com.redhat.pantheon.model.api.FileResource;
>>>>>>> c7b8025... Assembly changes:pantheon-bundle/src/main/java/com/redhat/pantheon/servlet/ModuleRendering.java
import com.redhat.pantheon.model.module.*;
import org.apache.commons.lang3.LocaleUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

import static com.redhat.pantheon.conf.GlobalConfig.DEFAULT_MODULE_LOCALE;
import static com.redhat.pantheon.model.module.ModuleVariant.DEFAULT_VARIANT_NAME;
import static com.redhat.pantheon.servlet.ServletUtils.paramValue;
import static com.redhat.pantheon.servlet.ServletUtils.paramValueAsBoolean;
import static java.util.stream.Collectors.toMap;

/**
 * Renders an HTML preview for a single module.
 * To provide parameters to the asciidoc generation process, provide the parameters with their name prefixed
 * with "ctx_".
 *
 * For example, if an asciidoc attribute of name 'product' needs to be passed, there will need to be a
 * query parameter of name 'ctx_product' provided in the url.
 */
<<<<<<< HEAD:pantheon-bundle/src/main/java/com/redhat/pantheon/servlet/ModuleRendererServlet.java
@Component(
        service = Servlet.class,
        property = {
                Constants.SERVICE_DESCRIPTION + "=Servlet which transforms asciidoc content into html",
                Constants.SERVICE_VENDOR + "=Red Hat Content Tooling team"
        })
@SlingServletResourceTypes(
        resourceTypes = { "pantheon/module"},
        methods = "GET",
        extensions = "preview")
public class ModuleRendererServlet extends SlingSafeMethodsServlet {

    private final Logger log = LoggerFactory.getLogger(ModuleRendererServlet.class);
=======
public class ModuleRendering implements Rendering {

    private final Logger log = LoggerFactory.getLogger(ModuleRendering.class);

    static final String PARAM_RERENDER = "rerender";
    static final String PARAM_DRAFT = "draft";
    static final String PARAM_LOCALE = "locale";
    static final String PARAM_VARIANT = "variant";
>>>>>>> c7b8025... Assembly changes:pantheon-bundle/src/main/java/com/redhat/pantheon/servlet/ModuleRendering.java

    private AsciidoctorService asciidoctorService;

    @Activate
<<<<<<< HEAD:pantheon-bundle/src/main/java/com/redhat/pantheon/servlet/ModuleRendererServlet.java
    public ModuleRendererServlet(
=======
    public ModuleRendering(
>>>>>>> c7b8025... Assembly changes:pantheon-bundle/src/main/java/com/redhat/pantheon/servlet/ModuleRendering.java
            @Reference AsciidoctorService asciidoctorService) {
        this.asciidoctorService = asciidoctorService;
    }

    @Override
<<<<<<< HEAD:pantheon-bundle/src/main/java/com/redhat/pantheon/servlet/ModuleRendererServlet.java
    protected void doGet(SlingHttpServletRequest request,
            SlingHttpServletResponse response) throws ServletException, IOException {
        String locale = paramValue(request, PantheonConstants.PARAM_LOCALE, DEFAULT_MODULE_LOCALE.toString());
        boolean draft = paramValueAsBoolean(request, PantheonConstants.PARAM_DRAFT);
        boolean reRender = paramValueAsBoolean(request, PantheonConstants.PARAM_RERENDER);
        String variantName = paramValue(request, PantheonConstants.PARAM_VARIANT, DEFAULT_VARIANT_NAME);
=======
    public void getRenderedHTML(SlingHttpServletRequest request,
            SlingHttpServletResponse response) throws IOException {
        String locale = paramValue(request, PARAM_LOCALE, DEFAULT_MODULE_LOCALE.toString());
        boolean draft = paramValueAsBoolean(request, PARAM_DRAFT);
        boolean reRender = paramValueAsBoolean(request, PARAM_RERENDER);
        String variantName = paramValue(request, PARAM_VARIANT, DEFAULT_VARIANT_NAME);

        Module module = request.getResource().adaptTo(Module.class);
>>>>>>> c7b8025... Assembly changes:pantheon-bundle/src/main/java/com/redhat/pantheon/servlet/ModuleRendering.java
        Locale localeObj = LocaleUtils.toLocale(locale);

        Module module = request.getResource().adaptTo(Module.class);
        Optional<HashableFileResource> moduleVariantSource = module.moduleLocale(localeObj)
                        .traverse()
                        .toChild(ModuleLocale::source)
                        .toChild(draft ? SourceContent::draft : SourceContent::released)
                        .getAsOptional();

        if(!moduleVariantSource.isPresent()) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, (draft ? "Draft " : "Released ")
                    + "source content not found for " + variantName +  " module variant at "
                    + request.getResource().getPath());
            return;
        }
        // collect a list of parameter that traverseFrom with 'ctx_' as those will be used as asciidoctorj
        // parameters
        Map<String, Object> context = asciidoctorService.buildContextFromRequest(request);

        // only allow forced rerendering if this is a draft version. Released and historical revs are written in stone.
        String html = asciidoctorService.getModuleHtml(
                module, localeObj, variantName, draft, context, reRender && draft);

        response.setContentType("text/html");
        Writer w = response.getWriter();
        w.write(html);
    }

}
