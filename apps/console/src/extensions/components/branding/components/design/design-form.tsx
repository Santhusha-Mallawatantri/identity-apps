/**
 * Copyright (c) 2021, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import { AlertInterface, AlertLevels, IdentifiableComponentInterface } from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import { Field, Form, FormPropsInterface } from "@wso2is/form";
import { Code, GenericIcon, Heading, ImagePreview, SegmentedAccordion, Text } from "@wso2is/react-components";
import cloneDeep from "lodash-es/cloneDeep";
import isEmpty from "lodash-es/isEmpty";
import React, {
    FunctionComponent,
    MutableRefObject,
    ReactElement,
    Ref,
    SyntheticEvent,
    forwardRef,
    useEffect,
    useState
} from "react";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Divider, DropdownItemProps, Grid, Label, Menu, Segment } from "semantic-ui-react";
import * as LayoutDesignExtensions from "./layout-design-extensions";
import { LayoutSwatchAdapter } from "./layout-swatch";
import { ThemeSwatchAdapter, ThemeSwatchUIConfigsInterface } from "./theme-swatch";
import { AppState } from "../../../../../features/core/store";
import { useLayout } from "../../api";
import { BrandingPreferencesConstants } from "../../constants";
import { BrandingPreferenceMeta, PredefinedLayouts, PredefinedThemes } from "../../meta";
import {
    BrandingPreferenceInterface,
    BrandingPreferenceLayoutInterface,
    BrandingPreferenceThemeInterface,
    FontConfigurationStrategies
} from "../../models";

/**
 * Interface for Branding Preference Design Form props.
 */
interface DesignFormPropsInterface extends IdentifiableComponentInterface {

    /**
     * Broadcast realtime edited values to subscribers.
     * @param values - Form values.
     */
    broadcastValues: (values: DesignFormValuesInterface) => void;
    /**
     * Design form initial values.
     */
    initialValues: DesignFormValuesInterface;
    /**
     * Callback for form submit.
     * @param values - Resolved Form Values.
     */
    onSubmit: (values: DesignFormValuesInterface) => void;
    /**
     * Is readonly.
     */
    readOnly?: boolean;
    /**
     * Ref for the form.
     */
    ref: Ref<FormPropsInterface>;
}

/**
 * Form initial values interface.
 */
export type DesignFormValuesInterface =
    Pick<BrandingPreferenceInterface, "theme">
    & Pick<BrandingPreferenceInterface, "layout">;

/* eslint-disable sort-keys */
/**
 * The tab indexes of the accordion items.
 */
const ACCORDION_TAB_INDEXES = {
    IMAGES: 0,
    COLORS: 1,
    PAGE: 2,
    FOOTER: 3,
    TYPOGRAPHY: 4,
    HEADINGS: 5,
    BUTTONS: 6,
    LOGIN_BOX: 7,
    INPUTS: 8
};
/* eslint-enable sort-keys */

const FORM_ID: string = "branding-design-form";

/**
 * Branding Preference Design Form.
 *
 * @param props - Props injected to the component.
 * @returns Functional component.
 */
export const DesignForm: FunctionComponent<DesignFormPropsInterface> = forwardRef((
    props: DesignFormPropsInterface,
    ref: MutableRefObject<FormPropsInterface>): ReactElement => {

    const {
        broadcastValues,
        initialValues,
        onSubmit,
        readOnly,
        ["data-componentid"]: componentId
    } = props;

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const productName: string = useSelector((state: AppState) => state.config.ui.productName);
    const themeName: string = useSelector((state: AppState) => state.config.ui.theme?.name);
    const tenantDomain: string = useSelector((state: AppState) => state.auth.tenantDomain);

    const [ accordionActiveIndexes, setAccordionActiveIndexes ] = useState<number[]>([]);
    const [ theme, setTheme ] = useState<BrandingPreferenceThemeInterface>(initialValues.theme);
    const [ layout, setLayout ] = useState<BrandingPreferenceLayoutInterface>(initialValues.layout);
    const [
        fontConfigurationStrategy,
        setFontConfigurationStrategy
    ] = useState<FontConfigurationStrategies>(
        isEmpty(initialValues.theme[theme.activeTheme].typography.font.importURL)
            ? FontConfigurationStrategies.BROWSER_DEFAULT
            : FontConfigurationStrategies.CDN
    );
    const [ fontFamilyFromBrowserDefaults, setFontFamilyFromBrowserDefaults ] = useState<string>(
        initialValues.theme[theme.activeTheme].typography.font.importURL
            ? BrandingPreferencesConstants.DEFAULT_FONT_FROM_THEME
            : initialValues.theme[theme.activeTheme].typography.font.fontFamily
    );
    const [
        fontImportURLFromCDN,
        setFontImportURLFromCDN
    ] = useState<string>(initialValues.theme[theme.activeTheme].typography.font.importURL);
    const [ fontFamilyFromCDN, setFontFamilyFromCDN ] = useState<string>(
        initialValues.theme[theme.activeTheme].typography.font.importURL
            ? initialValues.theme[theme.activeTheme].typography.font.fontFamily
            : ""
    );
    /**
     * Layout design extensions name for the current layout.
     */
    const [ layoutDesignExtensionsName, setLayoutDesignExtensionsName ] = useState<string>(null);

    const {
        data: customLayoutBlob,
        isLoading: customLayoutLoading
    } = useLayout(PredefinedLayouts.CUSTOM, tenantDomain);

    /**
     * Set the internal initial theme state.
     */
    useEffect(() => {

        setTheme(initialValues.theme);
    }, [ initialValues.theme ]);

    /**
     * Set the internal initial layout state.
     */
    useEffect(() => {

        setLayout(initialValues.layout);
    }, [ initialValues.layout ]);

    /**
     * Broadcast values to the outside when internals change.
     */
    useEffect(() => {

        broadcastValues({
            ...initialValues,
            layout: {
                ...initialValues.layout,
                ...layout
            },
            theme: {
                ...initialValues.theme,
                ...theme
            }
        });
    }, [ theme, layout ]);

    useEffect(() => {

        setLayoutDesignExtensionsName(
            layout.activeLayout.split("-").map(
                (word) => word.charAt(0).toUpperCase() + word.slice(1)
            ).join("") + "LayoutExtensionComponents"
        );
    }, [ layout.activeLayout ]);

    /**
     * Browser default font family dropdown.
     *
     * @returns Font family dropdown component.
     */
    const FontFamilyDropdown = (): ReactElement => {

        const getFontList = (): DropdownItemProps[] => {

            return BrandingPreferenceMeta.getWebSafeFonts()
                .map((font: string, index: number) => {
                    return {
                        content: <span style={ { fontFamily: font } }>{ font }</span>,
                        key: index,
                        text: font,
                        value: font
                    };
                });
        };

        return (
            <Field.Dropdown
                ariaLabel="Browser default font family dropdown"
                name="fontFamilyFromBrowserDefaults"
                label={ t("extensions:develop.branding.forms.design.theme.font.fields.fontFamilyDropdown.label") }
                options={ getFontList() }
                value={ fontFamilyFromBrowserDefaults }
                required={ false }
                readOnly={ readOnly }
                data-componentid={ `${componentId}-typography-font-family-dropdown` }
                hint={ t("extensions:develop.branding.forms.design.theme.font.fields.fontFamilyDropdown.hint") }
                placeholder={
                    t("extensions:develop.branding.forms.design.theme.font.fields.fontFamilyDropdown.placeholder")
                }
                listen={ (value: string) => {
                    setFontFamilyFromBrowserDefaults(value);
                    setTheme({
                        ...theme,
                        [theme.activeTheme]: {
                            ...theme[theme.activeTheme],
                            typography: {
                                ...theme[theme.activeTheme].typography,
                                font: {
                                    ...theme[theme.activeTheme].typography.font,
                                    fontFamily: value
                                }
                            }
                        }
                    });
                } }
                style={ {
                    fontFamily: fontFamilyFromBrowserDefaults
                } }
            />
        );
    };

    /**
     * Handles Form Submit.
     *
     * @param values - Raw values.
     */
    const handleFormSubmit = (values: DesignFormValuesInterface): void => {

        const _values = cloneDeep(values);

        // Delete the temp form attrs since they are merged in to the main object.
        _values[ "fontFamilyFromCDN" ] && delete _values[ "fontFamilyFromCDN" ];
        _values[ "fontFamilyFromBrowserDefaults" ] && delete _values[ "fontFamilyFromBrowserDefaults" ];

        // Remove  `importURL` from the theme if the strategy is browser default.
        if (fontConfigurationStrategy === FontConfigurationStrategies.BROWSER_DEFAULT) {
            _values.theme[theme.activeTheme].typography.font.importURL = "";
            _values.theme[theme.activeTheme].typography.font.fontFamily = fontFamilyFromBrowserDefaults;
            setTheme({
                ...theme,
                [theme.activeTheme]: {
                    ...theme[theme.activeTheme],
                    typography: {
                        ...theme[theme.activeTheme].typography,
                        font: {
                            ...theme[theme.activeTheme].typography.font,
                            importURL: ""
                        }
                    }
                }
            });
            setFontImportURLFromCDN("");
            setFontFamilyFromCDN("");
        } else {
            _values.theme[theme.activeTheme].typography.font.importURL = theme[
                theme.activeTheme
            ].typography.font.importURL;
            _values.theme[theme.activeTheme].typography.font.fontFamily = fontFamilyFromCDN;
            setFontFamilyFromBrowserDefaults(BrandingPreferencesConstants.DEFAULT_FONT_FROM_THEME);
        }

        // Avoid activating the custom layout when there is no deployed custom layout.
        if (_values.layout.activeLayout === PredefinedLayouts.CUSTOM) {
            while (customLayoutLoading) {
                // Wait until finished the loading of custom layout.
            }

            if (customLayoutBlob) {
                onSubmit(_values);
            } else {
                dispatch(addAlert<AlertInterface>({
                    description:
                        t("extensions:develop.branding.notifications.fetch.customLayoutNotFound.description",
                            { tenant: tenantDomain }),
                    level: AlertLevels.ERROR,
                    message: t("extensions:develop.branding.notifications.fetch.customLayoutNotFound.message")
                }));
            }
        } else {
            onSubmit(_values);
        }
    };

    /**
     * Handles accordion title click.
     *
     * @param e - Click event.
     * @param index - Clicked on index.
     */
    const handleAccordionOnClick = (e: SyntheticEvent, { index }: { index: number }): void => {

        const newIndexes: number[] = [ ...accordionActiveIndexes ];

        if (newIndexes.includes(index)) {
            const removingIndex = newIndexes.indexOf(index);

            newIndexes.splice(removingIndex, 1);
        } else {
            newIndexes.push(index);
        }

        setAccordionActiveIndexes(newIndexes);
    };

    /**
     * Renders the form fields for the images section.
     *
     * @returns Image field components.
     */
    const renderImageFields = (): ReactElement => (
        <Grid>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Divider horizontal>
                        <Heading as="h5">
                            { t("extensions:develop.branding.forms.design.theme.images.logo.heading") }
                        </Heading>
                    </Divider>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <ImagePreview
                        label={ t("extensions:develop.branding.forms.design.theme.images.logo.preview") }
                        style={
                            layout.activeLayout !== PredefinedLayouts.CUSTOM
                                ? {
                                    background: theme[ theme?.activeTheme ]?.page?.background?.backgroundColor
                                }
                                : null
                        }
                        data-componentid={ `${componentId}-logo-image-preview` }
                    >
                        <GenericIcon
                            transparent
                            size="tiny"
                            icon={
                                !isEmpty(theme[theme.activeTheme].images.logo.imgURL)
                                    ? theme[theme.activeTheme].images.logo.imgURL
                                    : Object.prototype.hasOwnProperty.call(
                                        BrandingPreferenceMeta.getBrandingPreferenceInternalFallbacks().theme,
                                        theme.activeTheme
                                    )
                                        ? BrandingPreferenceMeta.getBrandingPreferenceInternalFallbacks()
                                            .theme[theme.activeTheme].images.logo.imgURL
                                        : BrandingPreferenceMeta.getBrandingPreferenceInternalFallbacks()
                                            .theme[BrandingPreferencesConstants.DEFAULT_THEME].images.logo.imgURL
                            }
                        />
                    </ImagePreview>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.Input
                        ariaLabel="Branding preference logo URL"
                        inputType="url"
                        name={ `theme.${theme.activeTheme}.images.logo.imgURL` }
                        label={ t("extensions:develop.branding.forms.design.theme.images.logo.fields.url.label") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.images.logo.fields.url.placeholder")
                        }
                        hint={ (
                            <Trans
                                i18nKey={ "extensions:develop.branding.forms.design.theme.images.logo.fields.url.hint" }
                                tOptions={ {
                                    productName
                                } }
                            >
                                Use an image that’s atleast <Code>600x600 pixels</Code> and less than
                                <Code>1mb</Code> in size for better performance. If not set,
                                { productName } defaults will be used.
                            </Trans>
                        ) }
                        required={ false }
                        value={ initialValues.theme[theme.activeTheme].images.logo.imgURL }
                        readOnly={ readOnly }
                        maxLength={ BrandingPreferencesConstants.DESIGN_FORM_FIELD_CONSTRAINTS.LOGO_URL_MAX_LENGTH }
                        minLength={ BrandingPreferencesConstants.DESIGN_FORM_FIELD_CONSTRAINTS.LOGO_URL_MIN_LENGTH }
                        width={ 16 }
                        data-componentid={ `${componentId}-logo-url` }
                        listen={ (value: string) => {
                            setTheme({
                                ...theme,
                                [theme.activeTheme]: {
                                    ...theme[theme.activeTheme],
                                    images: {
                                        ...theme[theme.activeTheme].images,
                                        logo: {
                                            ...theme[theme.activeTheme].images.logo,
                                            imgURL: value
                                        }
                                    }
                                }
                            });
                        } }
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.Input
                        ariaLabel="Branding preference logo alt text"
                        inputType="default"
                        name={ `theme.${theme.activeTheme}.images.logo.altText` }
                        label={ t("extensions:develop.branding.forms.design.theme.images.logo.fields.alt.label") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.images.logo.fields.alt.placeholder")
                        }
                        hint={
                            t("extensions:develop.branding.forms.design.theme.images.logo.fields.alt.hint",
                                { productName })
                        }
                        required={ false }
                        value={ initialValues.theme[theme.activeTheme].images.logo.altText }
                        readOnly={ readOnly }
                        maxLength={
                            BrandingPreferencesConstants.DESIGN_FORM_FIELD_CONSTRAINTS.LOGO_ALT_TEXT_MAX_LENGTH
                        }
                        minLength={
                            BrandingPreferencesConstants.DESIGN_FORM_FIELD_CONSTRAINTS.LOGO_ALT_TEXT_MIN_LENGTH
                        }
                        width={ 16 }
                        data-componentid={ `${componentId}-logo-alt-text` }
                        listen={ (value: string) => {
                            setTheme({
                                ...theme,
                                [theme.activeTheme]: {
                                    ...theme[theme.activeTheme],
                                    images: {
                                        ...theme[theme.activeTheme].images,
                                        logo: {
                                            ...theme[theme.activeTheme].images.logo,
                                            altText: value
                                        }
                                    }
                                }
                            });
                        } }
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Divider horizontal>
                        <Heading as="h5">
                            { t("extensions:develop.branding.forms.design.theme.images.favicon.heading") }
                        </Heading>
                    </Divider>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <ImagePreview
                        label={ t("extensions:develop.branding.forms.design.theme.images.favicon.preview") }
                        data-componentid={ `${componentId}-favicon-image-preview` }
                    >
                        <GenericIcon
                            square
                            transparent
                            size="x22"
                            icon={
                                !isEmpty(theme[theme.activeTheme].images.favicon.imgURL)
                                    ? theme[theme.activeTheme].images.favicon.imgURL
                                    : Object.prototype.hasOwnProperty.call(
                                        BrandingPreferenceMeta.getBrandingPreferenceInternalFallbacks().theme,
                                        theme.activeTheme
                                    )
                                        ? BrandingPreferenceMeta.getBrandingPreferenceInternalFallbacks()
                                            .theme[theme.activeTheme].images.favicon.imgURL
                                        : BrandingPreferenceMeta.getBrandingPreferenceInternalFallbacks()
                                            .theme[BrandingPreferencesConstants.DEFAULT_THEME].images.favicon.imgURL
                            }
                        />
                    </ImagePreview>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.Input
                        ariaLabel="Branding preference favicon URL"
                        inputType="url"
                        name={ `theme.${theme.activeTheme}.images.favicon.imgURL` }
                        label={ t("extensions:develop.branding.forms.design.theme.images.favicon.fields.url.label") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.images.favicon.fields.url.placeholder")
                        }
                        hint={ (
                            <Trans
                                i18nKey={
                                    "extensions:develop.branding.forms.design.theme.images.favicon.fields.url.hint"
                                }
                                tOptions={ {
                                    productName
                                } }
                            >
                                Use an image that’s atleast <Code>16x16 pixels</Code> or more with square pixel
                                aspect ratio for better results. If not set, { productName } defaults will be used.
                            </Trans>
                        ) }
                        required={ false }
                        value={ initialValues.theme[theme.activeTheme].images.favicon.imgURL }
                        readOnly={ readOnly }
                        maxLength={ BrandingPreferencesConstants.DESIGN_FORM_FIELD_CONSTRAINTS.FAVICON_URL_MAX_LENGTH }
                        minLength={ BrandingPreferencesConstants.DESIGN_FORM_FIELD_CONSTRAINTS.FAVICON_URL_MIN_LENGTH }
                        width={ 16 }
                        data-componentid={ `${componentId}-favicon-url` }
                        listen={ (value: string) => {
                            setTheme({
                                ...theme,
                                [theme.activeTheme]: {
                                    ...theme[theme.activeTheme],
                                    images: {
                                        ...theme[theme.activeTheme].images,
                                        favicon: {
                                            ...theme[theme.activeTheme].images.favicon,
                                            imgURL: value
                                        }
                                    }
                                }
                            });
                        } }
                    />
                </Grid.Column>
            </Grid.Row>
            { /* Layout Design Image Extension Fields. */ }
            { LayoutDesignExtensions[layoutDesignExtensionsName] &&
                LayoutDesignExtensions[layoutDesignExtensionsName].renderImageExtensionFields
                ? LayoutDesignExtensions[layoutDesignExtensionsName].renderImageExtensionFields({
                    "data-componentid": componentId,
                    initialValues,
                    layout,
                    readOnly,
                    setLayout,
                    t
                })
                : null
            }
        </Grid>
    );

    /**
     * Renders the form fields for the colors section.
     *
     * @returns Color pallette field components.
     */
    const renderColorPaletteFields = (): ReactElement => (
        <Grid>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="Primary color input field"
                        label={ t("extensions:develop.branding.forms.design.theme.colors.fields.primaryColor.label") }
                        name={ `theme.${theme.activeTheme}.colors.primary` }
                        value={ initialValues.theme[theme.activeTheme].colors.primary }
                        data-componentid={ `${componentId}-primary-color` }
                        required={ false }
                        readOnly={ readOnly }
                        hint={ t("extensions:develop.branding.forms.design.theme.colors.fields.primaryColor.hint") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.colors.fields.primaryColor.placeholder")
                        }
                        listen={ (value: string) => {
                            setTheme({
                                ...theme,
                                [theme.activeTheme]: {
                                    ...theme[theme.activeTheme],
                                    colors: {
                                        ...theme[theme.activeTheme].colors,
                                        primary: value
                                    }
                                }
                            });
                        } }
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="Secondary color input field"
                        label={ t("extensions:develop.branding.forms.design.theme.colors.fields.secondaryColor.label") }
                        name={ `theme.${theme.activeTheme}.colors.secondary` }
                        value={ initialValues.theme[theme.activeTheme].colors.secondary }
                        data-componentid={ `${componentId}-secondary-color` }
                        required={ false }
                        readOnly={ readOnly }
                        hint={ t("extensions:develop.branding.forms.design.theme.colors.fields.secondaryColor.hint") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.colors.fields.secondaryColor.placeholder")
                        }
                        listen={ (value: string) => {
                            setTheme({
                                ...theme,
                                [theme.activeTheme]: {
                                    ...theme[theme.activeTheme],
                                    colors: {
                                        ...theme[theme.activeTheme].colors,
                                        secondary: value
                                    }
                                }
                            });
                        } }
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );

    /**
     * Renders the form fields for the page section.
     *
     * @returns Page fields components.
     */
    const renderPageFields = (): ReactElement => (
        <Grid>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="Page background color input field"
                        label={ t("extensions:develop.branding.forms.design.theme.page.fields.backgroundColor.label") }
                        name={ `theme.${theme.activeTheme}.page.background.backgroundColor` }
                        value={ initialValues.theme[theme.activeTheme].page.background.backgroundColor }
                        data-componentid={ `${componentId}-page-background-color` }
                        required={ false }
                        readOnly={ readOnly }
                        hint={ t("extensions:develop.branding.forms.design.theme.page.fields.backgroundColor.hint") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.page.fields.backgroundColor.placeholder")
                        }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                page: {
                                    ...theme[theme.activeTheme].page,
                                    background: {
                                        ...theme[theme.activeTheme].page.background,
                                        backgroundColor: value
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="Page font color input field"
                        label={ t("extensions:develop.branding.forms.design.theme.page.fields.fontColor.label") }
                        name={ `theme.${theme.activeTheme}.page.font.color` }
                        value={ initialValues.theme[theme.activeTheme].page.font.color }
                        data-componentid={ `${componentId}-page-font-color` }
                        required={ false }
                        readOnly={ readOnly }
                        hint={ t("extensions:develop.branding.forms.design.theme.page.fields.fontColor.hint") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.page.fields.fontColor.placeholder")
                        }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                page: {
                                    ...theme[theme.activeTheme].page,
                                    font: {
                                        ...theme[theme.activeTheme].page.font,
                                        color: value
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );

    /**
     * Renders the form fields for the footer section.
     *
     * @returns Footer fields components.
     */
    const renderFooterFields = (): ReactElement => (
        <Grid>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="Footer border color input field"
                        label={ t("extensions:develop.branding.forms.design.theme.footer.fields.borderColor.label") }
                        name={ `theme.${theme.activeTheme}.footer.border.borderColor` }
                        value={ initialValues.theme[theme.activeTheme].footer.border.borderColor }
                        data-componentid={ `${componentId}-footer-border-color` }
                        required={ false }
                        readOnly={ readOnly }
                        hint={ t("extensions:develop.branding.forms.design.theme.footer.fields.borderColor.hint") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.footer.fields.borderColor.placeholder")
                        }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                footer: {
                                    ...theme[theme.activeTheme].footer,
                                    border: {
                                        ...theme[theme.activeTheme].footer.border,
                                        borderColor: value
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="Footer font color input field"
                        label={ t("extensions:develop.branding.forms.design.theme.footer.fields.fontColor.label") }
                        name={ `theme.${theme.activeTheme}.footer.font.color` }
                        value={ initialValues.theme[theme.activeTheme].footer.font.color }
                        data-componentid={ `${componentId}-footer-font-color` }
                        required={ false }
                        readOnly={ readOnly }
                        hint={ t("extensions:develop.branding.forms.design.theme.footer.fields.fontColor.hint") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.footer.fields.fontColor.placeholder")
                        }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                footer: {
                                    ...theme[theme.activeTheme].footer,
                                    font: {
                                        ...theme[theme.activeTheme].footer.font,
                                        color: value
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );

    /**
     * Renders the form fields for the typography section.
     *
     * @returns Typography field components.
     */
    const renderTypographyFields = (): ReactElement => (
        <Grid>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <div className="font-family-selector">
                        <Menu pointing widths={ 2 }>
                            <Menu.Item
                                name={ t("extensions:develop.branding.forms.design.theme.font.types.fromDefaults") }
                                active={ fontConfigurationStrategy === FontConfigurationStrategies.BROWSER_DEFAULT }
                                onClick={ () => {
                                    if (fontConfigurationStrategy === FontConfigurationStrategies.BROWSER_DEFAULT) {
                                        return;
                                    }

                                    setTheme({
                                        ...theme,
                                        [theme.activeTheme]: {
                                            ...theme[theme.activeTheme],
                                            typography: {
                                                ...theme[theme.activeTheme].typography,
                                                font: {
                                                    ...theme[theme.activeTheme].typography.font,
                                                    fontFamily: fontFamilyFromBrowserDefaults,
                                                    importURL: ""
                                                }
                                            }
                                        }
                                    });
                                    setFontConfigurationStrategy(FontConfigurationStrategies.BROWSER_DEFAULT);
                                } }
                            />
                            <Menu.Item
                                name={ t("extensions:develop.branding.forms.design.theme.font.types.fromCDN") }
                                active={ fontConfigurationStrategy === FontConfigurationStrategies.CDN }
                                onClick={ () => {
                                    if (fontConfigurationStrategy === FontConfigurationStrategies.CDN) {
                                        return;
                                    }

                                    setTheme({
                                        ...theme,
                                        [theme.activeTheme]: {
                                            ...theme[theme.activeTheme],
                                            typography: {
                                                ...theme[theme.activeTheme].typography,
                                                font: {
                                                    ...theme[theme.activeTheme].typography.font,
                                                    // Avoid a null font family being shown in the preview.
                                                    fontFamily: !isEmpty(fontFamilyFromCDN)
                                                        ? fontFamilyFromCDN
                                                        : fontFamilyFromBrowserDefaults,
                                                    importURL: fontImportURLFromCDN
                                                }
                                            }
                                        }
                                    });
                                    setFontConfigurationStrategy(FontConfigurationStrategies.CDN);
                                } }
                            />
                        </Menu>
                        <Segment>
                            {
                                fontConfigurationStrategy === FontConfigurationStrategies.BROWSER_DEFAULT
                                    ? FontFamilyDropdown()
                                    : (
                                        <>
                                            <Field.Input
                                                ariaLabel="Branding preference font import URL"
                                                inputType="url"
                                                name={ `theme.${theme.activeTheme}.typography.font.importURL` }
                                                label={
                                                    t("extensions:develop.branding.forms.design.theme.font.fields"
                                                        + ".importURL.label")
                                                }
                                                placeholder={
                                                    t("extensions:develop.branding.forms.design.theme.font.fields"
                                                        + ".importURL.placeholder")
                                                }
                                                hint={
                                                    t("extensions:develop.branding.forms.design.theme.font.fields"
                                                        + ".importURL.hint")
                                                }
                                                required={ false }
                                                value={
                                                    theme[theme.activeTheme].typography.font.importURL
                                                }
                                                readOnly={ readOnly }
                                                maxLength={
                                                    BrandingPreferencesConstants
                                                        .DESIGN_FORM_FIELD_CONSTRAINTS.FONT_IMPORT_URL_MAX_LENGTH
                                                }
                                                minLength={
                                                    BrandingPreferencesConstants
                                                        .DESIGN_FORM_FIELD_CONSTRAINTS.FONT_IMPORT_URL_MIN_LENGTH
                                                }
                                                data-componentid={ `${componentId}-typography-font-cdn-url` }
                                                listen={ (value: string) => {
                                                    setFontImportURLFromCDN(value);
                                                    setTheme({
                                                        ...theme,
                                                        [theme.activeTheme]: {
                                                            ...theme[theme.activeTheme],
                                                            typography: {
                                                                ...theme[theme.activeTheme].typography,
                                                                font: {
                                                                    ...theme[theme.activeTheme].typography.font,
                                                                    importURL: value
                                                                }
                                                            }
                                                        }
                                                    });
                                                } }
                                            />
                                            <Divider hidden />
                                            <Field.Input
                                                ariaLabel="Font family input field"
                                                inputType="default"
                                                name="fontFamilyFromCDN"
                                                label={
                                                    t("extensions:develop.branding.forms.design.theme.font.fields"
                                                        + ".fontFamilyInput.label")
                                                }
                                                placeholder={
                                                    t("extensions:develop.branding.forms.design.theme.font.fields"
                                                        + ".fontFamilyInput.placeholder")
                                                }
                                                hint={
                                                    t("extensions:develop.branding.forms.design.theme.font.fields"
                                                        + ".fontFamilyInput.hint")
                                                }
                                                required={ !!theme[theme.activeTheme].typography.font.importURL }
                                                disabled={ !theme[theme.activeTheme].typography.font.importURL }
                                                readOnly={ readOnly }
                                                value={ fontFamilyFromCDN }
                                                maxLength={
                                                    BrandingPreferencesConstants
                                                        .DESIGN_FORM_FIELD_CONSTRAINTS.FONT_FAMILY_MAX_LENGTH
                                                }
                                                minLength={
                                                    BrandingPreferencesConstants
                                                        .DESIGN_FORM_FIELD_CONSTRAINTS.FONT_FAMILY_MIN_LENGTH
                                                }
                                                width={ 16 }
                                                data-componentid={ `${componentId}-typography-font-family-input` }
                                                listen={ (value: string) => {
                                                    setFontFamilyFromCDN(value);
                                                    setTheme({
                                                        ...theme,
                                                        [theme.activeTheme]: {
                                                            ...theme[theme.activeTheme],
                                                            typography: {
                                                                ...theme[theme.activeTheme].typography,
                                                                font: {
                                                                    ...theme[theme.activeTheme].typography.font,
                                                                    fontFamily: value
                                                                }
                                                            }
                                                        }
                                                    });
                                                } }
                                            />
                                        </>
                                    )
                            }
                        </Segment>
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );

    /**
     * Renders the form fields for the headings section.
     *
     * @returns Headings field components.
     */
    const renderHeadingsFields = (): ReactElement => (
        <Grid>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="Heading font color input field"
                        name={ `theme.${theme.activeTheme}.typography.heading.font.color` }
                        value={ initialValues.theme[theme.activeTheme].typography.heading.font.color }
                        data-componentid={ `${componentId}-typography-headings-font-color` }
                        required={ false }
                        readOnly={ readOnly }
                        label={ t("extensions:develop.branding.forms.design.theme.headings.fields.fontColor.label") }
                        hint={ t("extensions:develop.branding.forms.design.theme.headings.fields.fontColor.hint") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.headings.fields.fontColor.placeholder")
                        }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                typography: {
                                    ...theme[theme.activeTheme].typography,
                                    heading: {
                                        ...theme[theme.activeTheme].typography.heading,
                                        font: {
                                            ...theme[theme.activeTheme].typography.heading.font,
                                            color: value
                                        }
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>
            { /* Layout Design Headings Extension Fields. */ }
            { LayoutDesignExtensions[layoutDesignExtensionsName] &&
                LayoutDesignExtensions[layoutDesignExtensionsName].renderHeadingsExtensionFields
                ? LayoutDesignExtensions[layoutDesignExtensionsName].renderHeadingsExtensionFields({
                    "data-componentid": componentId,
                    initialValues,
                    layout,
                    readOnly,
                    setLayout,
                    t
                })
                : null
            }
        </Grid>
    );

    /**
     * Renders the form fields for the buttons section.
     *
     * @returns Button fields component.
     */
    const renderButtonsFields = (): ReactElement => (
        <Grid>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Divider horizontal>
                        <Heading as="h6">
                            { t("extensions:develop.branding.forms.design.theme.buttons.primary.heading") }
                        </Heading>
                    </Divider>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="Primary button font color picker"
                        name={ `theme.${theme.activeTheme}.buttons.primary.base.font.color` }
                        value={ initialValues.theme[theme.activeTheme].buttons.primary.base.font.color }
                        data-componentid={ `${componentId}-primary-button-font-color` }
                        required={ false }
                        readOnly={ readOnly }
                        label={
                            t("extensions:develop.branding.forms.design.theme.buttons.primary.fields.fontColor.label")
                        }
                        hint={
                            t("extensions:develop.branding.forms.design.theme.buttons.primary.fields.fontColor.hint")
                        }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.buttons.primary.fields." +
                                "fontColor.placeholder")
                        }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                buttons: {
                                    ...theme[theme.activeTheme].buttons,
                                    primary: {
                                        ...theme[theme.activeTheme].buttons.primary,
                                        base: {
                                            ...theme[theme.activeTheme].buttons.primary.base,
                                            font: {
                                                ...theme[theme.activeTheme].buttons.primary.base.font,
                                                color: value
                                            }
                                        }
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.Input
                        ariaLabel="Primary button border radius input field"
                        inputType="default"
                        name={ `theme.${theme.activeTheme}.buttons.primary.base.border.borderRadius` }
                        value={ initialValues.theme[theme.activeTheme].buttons.primary.base.border.borderRadius }
                        label={
                            t("extensions:develop.branding.forms.design.theme.buttons.primary." +
                                "fields.borderRadius.label")
                        }
                        hint={
                            t("extensions:develop.branding.forms.design.theme.buttons.primary." +
                                "fields.borderRadius.hint") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.buttons.primary." +
                                "fields.borderRadius.placeholder")
                        }
                        required={ false }
                        readOnly={ readOnly }
                        maxLength={
                            BrandingPreferencesConstants
                                .DESIGN_FORM_FIELD_CONSTRAINTS.BORDER_RADIUS_MAX_LENGTH
                        }
                        minLength={
                            BrandingPreferencesConstants
                                .DESIGN_FORM_FIELD_CONSTRAINTS.BORDER_RADIUS_MIN_LENGTH
                        }
                        width={ 16 }
                        data-componentid={ `${componentId}-primary-button-border-radius` }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                buttons: {
                                    ...theme[theme.activeTheme].buttons,
                                    primary: {
                                        ...theme[theme.activeTheme].buttons.primary,
                                        base: {
                                            ...theme[theme.activeTheme].buttons.primary.base,
                                            border: {
                                                ...theme[theme.activeTheme].buttons.primary.base.border,
                                                borderRadius: value
                                            }
                                        }
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Divider horizontal>
                        <Heading as="h6">
                            { t("extensions:develop.branding.forms.design.theme.buttons.secondary.heading") }
                        </Heading>
                    </Divider>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="Secondary button font color picker"
                        name={ `theme.${theme.activeTheme}.buttons.secondary.base.font.color` }
                        value={ initialValues.theme[theme.activeTheme].buttons.secondary.base.font.color }
                        data-componentid={ `${componentId}-secondary-button-font-color` }
                        required={ false }
                        readOnly={ readOnly }
                        label={
                            t("extensions:develop.branding.forms.design.theme.buttons.secondary." +
                                "fields.fontColor.label") }
                        hint={
                            t("extensions:develop.branding.forms.design.theme.buttons.secondary." +
                                "fields.fontColor.hint") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.buttons.secondary." +
                                "fields.fontColor.placeholder")
                        }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                buttons: {
                                    ...theme[theme.activeTheme].buttons,
                                    secondary: {
                                        ...theme[theme.activeTheme].buttons.secondary,
                                        base: {
                                            ...theme[theme.activeTheme].buttons.secondary.base,
                                            font: {
                                                ...theme[theme.activeTheme].buttons.secondary.base.font,
                                                color: value
                                            }
                                        }
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.Input
                        ariaLabel="Secondary button border radius input field"
                        inputType="default"
                        name={ `theme.${theme.activeTheme}.buttons.secondary.base.border.borderRadius` }
                        value={ initialValues.theme[theme.activeTheme].buttons.secondary.base.border.borderRadius }
                        label={
                            t("extensions:develop.branding.forms.design.theme.buttons.secondary." +
                                "fields.borderRadius.label")
                        }
                        hint={ t("extensions:develop.branding.forms.design.theme.buttons.secondary." +
                            "fields.borderRadius.hint") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.buttons.secondary.fields"
                                + ".borderRadius.placeholder")
                        }
                        required={ false }
                        readOnly={ readOnly }
                        maxLength={
                            BrandingPreferencesConstants
                                .DESIGN_FORM_FIELD_CONSTRAINTS.BORDER_RADIUS_MAX_LENGTH
                        }
                        minLength={
                            BrandingPreferencesConstants
                                .DESIGN_FORM_FIELD_CONSTRAINTS.BORDER_RADIUS_MIN_LENGTH
                        }
                        width={ 16 }
                        data-componentid={ `${componentId}-secondary-button-border-radius` }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                buttons: {
                                    ...theme[theme.activeTheme].buttons,
                                    secondary: {
                                        ...theme[theme.activeTheme].buttons.secondary,
                                        base: {
                                            ...theme[theme.activeTheme].buttons.secondary.base,
                                            border: {
                                                ...theme[theme.activeTheme].buttons.secondary.base.border,
                                                borderRadius: value
                                            }
                                        }
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Divider horizontal>
                        <Heading as="h6">
                            { t("extensions:develop.branding.forms.design.theme.buttons.externalConnections.heading") }
                        </Heading>
                    </Divider>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="External Connection button background color picker"
                        name={
                            `theme.${theme.activeTheme}.buttons.externalConnection.base.background.backgroundColor`
                        }
                        value={
                            initialValues.theme[
                                theme.activeTheme
                            ].buttons.externalConnection.base.background.backgroundColor
                        }
                        data-componentid={ `${componentId}-external-connection-button-font-color` }
                        required={ false }
                        readOnly={ readOnly }
                        label={
                            t("extensions:develop.branding.forms.design.theme.buttons.externalConnections"
                                + ".fields.backgroundColor.label")
                        }
                        hint={
                            t("extensions:develop.branding.forms.design.theme.buttons.externalConnections"
                                + ".fields.backgroundColor.hint")
                        }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.buttons.externalConnections"
                                + ".fields.backgroundColor.placeholder")
                        }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                buttons: {
                                    ...theme[theme.activeTheme].buttons,
                                    externalConnection: {
                                        ...theme[theme.activeTheme].buttons.externalConnection,
                                        base: {
                                            ...theme[theme.activeTheme].buttons.externalConnection.base,
                                            background: {
                                                ...theme[
                                                    theme.activeTheme
                                                ].buttons.externalConnection.base.background,
                                                backgroundColor: value
                                            }
                                        }
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="External Connection button font color picker"
                        name={ `theme.${theme.activeTheme}.buttons.externalConnection.base.font.color` }
                        value={ initialValues.theme[theme.activeTheme].buttons.externalConnection.base.font.color }
                        data-componentid={ `${componentId}-external-connection-button-font-color` }
                        required={ false }
                        readOnly={ readOnly }
                        label={
                            t("extensions:develop.branding.forms.design.theme.buttons.externalConnections"
                                + ".fields.fontColor.label")
                        }
                        hint={
                            t("extensions:develop.branding.forms.design.theme.buttons.externalConnections"
                                + ".fields.fontColor.hint")
                        }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.buttons.externalConnections"
                                + ".fields.fontColor.placeholder")
                        }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                buttons: {
                                    ...theme[theme.activeTheme].buttons,
                                    externalConnection: {
                                        ...theme[theme.activeTheme].buttons.externalConnection,
                                        base: {
                                            ...theme[theme.activeTheme].buttons.externalConnection.base,
                                            font: {
                                                ...theme[theme.activeTheme].buttons.externalConnection.base.font,
                                                color: value
                                            }
                                        }
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.Input
                        ariaLabel="External connection button border radius input field"
                        inputType="default"
                        name={ `theme.${theme.activeTheme}.buttons.externalConnection.base.border.borderRadius` }
                        value={
                            initialValues.theme[
                                theme.activeTheme
                            ].buttons.externalConnection.base.border.borderRadius
                        }
                        label={
                            t("extensions:develop.branding.forms.design.theme.buttons.externalConnections"
                                + ".fields.borderRadius.label")
                        }
                        hint={
                            t("extensions:develop.branding.forms.design.theme.buttons.externalConnections"
                                + ".fields.borderRadius.hint")
                        }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.buttons.externalConnections"
                                + ".fields.borderRadius.placeholder")
                        }
                        required={ false }
                        readOnly={ readOnly }
                        maxLength={
                            BrandingPreferencesConstants
                                .DESIGN_FORM_FIELD_CONSTRAINTS.BORDER_RADIUS_MAX_LENGTH
                        }
                        minLength={
                            BrandingPreferencesConstants
                                .DESIGN_FORM_FIELD_CONSTRAINTS.BORDER_RADIUS_MIN_LENGTH
                        }
                        width={ 16 }
                        data-componentid={ `${componentId}-external-connection-button-border-radius` }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                buttons: {
                                    ...theme[theme.activeTheme].buttons,
                                    externalConnection: {
                                        ...theme[theme.activeTheme].buttons.externalConnection,
                                        base: {
                                            ...theme[theme.activeTheme].buttons.externalConnection.base,
                                            border: {
                                                ...theme[theme.activeTheme].buttons.externalConnection.base.border,
                                                borderRadius: value
                                            }
                                        }
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );

    /**
     * Renders the form fields for the login box section.
     *
     * @returns Login box fields components.
     */
    const renderLoginBoxFields = (): React.ReactElement => (
        <Grid>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="Login box background color picker"
                        name={ `theme.${theme.activeTheme}.loginBox.background.backgroundColor` }
                        value={ initialValues.theme[theme.activeTheme].loginBox.background.backgroundColor }
                        data-componentid={ `${componentId}-login-box-background-color` }
                        required={ false }
                        readOnly={ readOnly }
                        label={
                            t("extensions:develop.branding.forms.design.theme.loginBox.fields.backgroundColor.label")
                        }
                        hint={
                            t("extensions:develop.branding.forms.design.theme.loginBox.fields.backgroundColor.hint")
                        }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.loginBox." +
                                "fields.backgroundColor.placeholder")
                        }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                loginBox: {
                                    ...theme[theme.activeTheme].loginBox,
                                    background: {
                                        ...theme[theme.activeTheme].loginBox.background,
                                        backgroundColor: value
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="Login box font color picker"
                        name={ `theme.${theme.activeTheme}.loginBox.font.color` }
                        value={ initialValues.theme[theme.activeTheme].loginBox.font.color }
                        data-componentid={ `${componentId}-login-box-font-color` }
                        required={ false }
                        readOnly={ readOnly }
                        label={ t("extensions:develop.branding.forms.design.theme.loginBox.fields.fontColor.label") }
                        hint={ t("extensions:develop.branding.forms.design.theme.loginBox.fields.fontColor.hint") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.loginBox.fields.fontColor.placeholder")
                        }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                loginBox: {
                                    ...theme[theme.activeTheme].loginBox,
                                    font: {
                                        ...theme[theme.activeTheme].loginBox.font,
                                        color: value
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="Login box border color picker"
                        name={ `theme.${theme.activeTheme}.loginBox.border.borderColor` }
                        value={ initialValues.theme[theme.activeTheme].loginBox.border.borderColor }
                        data-componentid={ `${componentId}-login-box-border-color` }
                        required={ false }
                        readOnly={ readOnly }
                        label={ t("extensions:develop.branding.forms.design.theme.loginBox.fields.borderColor.label") }
                        hint={ t("extensions:develop.branding.forms.design.theme.loginBox.fields.borderColor.hint") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.loginBox.fields.borderColor.placeholder")
                        }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                loginBox: {
                                    ...theme[theme.activeTheme].loginBox,
                                    border: {
                                        ...theme[theme.activeTheme].loginBox.border,
                                        borderColor: value
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.Input
                        ariaLabel="Login box border width input field"
                        inputType="default"
                        name={ `theme.${theme.activeTheme}.loginBox.border.borderWidth` }
                        value={ initialValues.theme[theme.activeTheme].loginBox.border.borderWidth }
                        label={ t("extensions:develop.branding.forms.design.theme.loginBox.fields.borderWidth.label") }
                        hint={ t("extensions:develop.branding.forms.design.theme.loginBox.fields.borderWidth.hint") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.loginBox.fields.borderWidth.placeholder")
                        }
                        required={ false }
                        readOnly={ readOnly }
                        maxLength={
                            BrandingPreferencesConstants
                                .DESIGN_FORM_FIELD_CONSTRAINTS.BORDER_WIDTH_MAX_LENGTH
                        }
                        minLength={
                            BrandingPreferencesConstants
                                .DESIGN_FORM_FIELD_CONSTRAINTS.BORDER_WIDTH_MIN_LENGTH
                        }
                        width={ 16 }
                        data-componentid={ `${componentId}-login-box-border-width` }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                loginBox: {
                                    ...theme[theme.activeTheme].loginBox,
                                    border: {
                                        ...theme[theme.activeTheme].loginBox.border,
                                        borderWidth: value
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.Input
                        ariaLabel="Login box border radius input field"
                        inputType="default"
                        name={ `theme.${theme.activeTheme}.loginBox.border.borderRadius` }
                        value={ initialValues.theme[theme.activeTheme].loginBox.border.borderRadius }
                        label={ t("extensions:develop.branding.forms.design.theme.loginBox.fields.borderRadius.label") }
                        hint={ t("extensions:develop.branding.forms.design.theme.loginBox.fields.borderRadius.hint") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.loginBox.fields.borderRadius.placeholder")
                        }
                        required={ false }
                        readOnly={ readOnly }
                        maxLength={
                            BrandingPreferencesConstants
                                .DESIGN_FORM_FIELD_CONSTRAINTS.BORDER_RADIUS_MAX_LENGTH
                        }
                        minLength={
                            BrandingPreferencesConstants
                                .DESIGN_FORM_FIELD_CONSTRAINTS.BORDER_RADIUS_MIN_LENGTH
                        }
                        width={ 16 }
                        data-componentid={ `${componentId}-login-box-border-radius` }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                loginBox: {
                                    ...theme[theme.activeTheme].loginBox,
                                    border: {
                                        ...theme[theme.activeTheme].loginBox.border,
                                        borderRadius: value
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );

    /**
     * Renders the form fields for the inputs section.
     *
     * @returns Input field components.
     */
    const renderInputFields = (): ReactElement => (
        <Grid>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="Input field background color picker"
                        name={ `theme.${theme.activeTheme}.inputs.base.background.backgroundColor` }
                        value={ initialValues.theme[theme.activeTheme].inputs.base.background.backgroundColor }
                        data-componentid={ `${componentId}-input-field-background-color` }
                        required={ false }
                        readOnly={ readOnly }
                        label={
                            t("extensions:develop.branding.forms.design.theme.inputs.fields.backgroundColor.label")
                        }
                        hint={
                            t("extensions:develop.branding.forms.design.theme.inputs.fields.backgroundColor.hint")
                        }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.inputs." +
                                "fields.backgroundColor.placeholder")
                        }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                inputs: {
                                    ...theme[theme.activeTheme].inputs,
                                    base: {
                                        ...theme[theme.activeTheme].inputs.base,
                                        background: {
                                            ...theme[theme.activeTheme].inputs.base.background,
                                            backgroundColor: value
                                        }
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="Input field font color picker"
                        name={ `theme.${theme.activeTheme}.inputs.base.font.color` }
                        value={ initialValues.theme[theme.activeTheme].inputs.base.font.color }
                        data-componentid={ `${componentId}-input-field-font-color` }
                        required={ false }
                        readOnly={ readOnly }
                        label={ t("extensions:develop.branding.forms.design.theme.inputs.fields.fontColor.label") }
                        hint={ t("extensions:develop.branding.forms.design.theme.inputs.fields.fontColor.hint") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.inputs.fields.fontColor.placeholder")
                        }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                inputs: {
                                    ...theme[theme.activeTheme].inputs,
                                    base: {
                                        ...theme[theme.activeTheme].inputs.base,
                                        font: {
                                            ...theme[theme.activeTheme].inputs.base.font,
                                            color: value
                                        }
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="Input field border color picker"
                        name={ `theme.${theme.activeTheme}.inputs.base.border.borderColor` }
                        value={ initialValues.theme[theme.activeTheme].inputs.base.border.borderColor }
                        required={ false }
                        readOnly={ readOnly }
                        label={ t("extensions:develop.branding.forms.design.theme.inputs.fields.borderColor.label") }
                        hint={ t("extensions:develop.branding.forms.design.theme.inputs.fields.borderColor.hint") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.inputs.fields.borderColor.placeholder")
                        }
                        data-componentid={ `${componentId}-input-field-border-color` }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                inputs: {
                                    ...theme[theme.activeTheme].inputs,
                                    base: {
                                        ...theme[theme.activeTheme].inputs.base,
                                        border: {
                                            ...theme[theme.activeTheme].inputs.base.border,
                                            borderColor: value
                                        }
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.Input
                        ariaLabel="Input field border radius input field"
                        inputType="default"
                        name={ `theme.${theme.activeTheme}.inputs.base.border.borderRadius` }
                        value={ initialValues.theme[theme.activeTheme].inputs.base.border.borderRadius }
                        required={ false }
                        readOnly={ readOnly }
                        label={ t("extensions:develop.branding.forms.design.theme.inputs.fields.borderRadius.label") }
                        hint={ t("extensions:develop.branding.forms.design.theme.inputs.fields.borderRadius.hint") }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.inputs.fields.borderRadius.placeholder")
                        }
                        maxLength={
                            BrandingPreferencesConstants.DESIGN_FORM_FIELD_CONSTRAINTS.BORDER_RADIUS_MAX_LENGTH
                        }
                        minLength={
                            BrandingPreferencesConstants.DESIGN_FORM_FIELD_CONSTRAINTS.BORDER_RADIUS_MIN_LENGTH
                        }
                        width={ 16 }
                        data-componentid={ `${componentId}-input-field-border-radius` }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                inputs: {
                                    ...theme[theme.activeTheme].inputs,
                                    base: {
                                        ...theme[theme.activeTheme].inputs.base,
                                        border: {
                                            ...theme[theme.activeTheme].inputs.base.border,
                                            borderRadius: value
                                        }
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Divider horizontal>
                        <Heading as="h6">
                            { t("extensions:develop.branding.forms.design.theme.inputs.labels.heading") }
                        </Heading>
                    </Divider>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 1 }>
                <Grid.Column>
                    <Field.ColorPicker
                        ariaLabel="Input field labels font color picker"
                        name={ `theme.${theme.activeTheme}.inputs.base.labels.font.color` }
                        value={ initialValues.theme[theme.activeTheme].inputs.base.labels.font.color }
                        data-componentid={ `${componentId}-input-field-labels-font-color` }
                        required={ false }
                        readOnly={ readOnly }
                        label={
                            t("extensions:develop.branding.forms.design.theme.inputs.labels.fields.fontColor.label")
                        }
                        hint={
                            t("extensions:develop.branding.forms.design.theme.inputs.labels.fields.fontColor.hint")
                        }
                        placeholder={
                            t("extensions:develop.branding.forms.design.theme.inputs." +
                                "labels.fields.fontColor.placeholder")
                        }
                        listen={ (value: string) => setTheme({
                            ...theme,
                            [theme.activeTheme]: {
                                ...theme[theme.activeTheme],
                                inputs: {
                                    ...theme[theme.activeTheme].inputs,
                                    base: {
                                        ...theme[theme.activeTheme].inputs.base,
                                        labels: {
                                            ...theme[theme.activeTheme].inputs.base.labels,
                                            font: {
                                                ...theme[theme.activeTheme].inputs.base.labels.font,
                                                color: value
                                            }
                                        }
                                    }
                                }
                            }
                        }) }
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );

    return (
        <Form
            id={ FORM_ID }
            ref={ ref }
            uncontrolledForm={ true }
            onSubmit={ handleFormSubmit }
            enableReinitialize={ true }
            initialValues={ initialValues }
        >
            <div>
                <Heading as="h4">
                    { t("extensions:develop.branding.tabs.design.sections.layoutVariation.heading") }
                    <Label
                        className="feature-status-label new"
                        size="mini"
                        data-componentid={ `${ componentId }-layout-version` }
                    >
                        { t("extensions:develop.branding.tabs.design.sections.layoutVariation.status") }
                    </Label>
                </Heading>
                <Text muted compact>
                    { t("extensions:develop.branding.tabs.design.sections.layoutVariation.description") }
                </Text>
            </div>
            <div>
                {

                    Object.keys(PredefinedLayouts)
                        .map((layoutKey: PredefinedLayouts, index: number) => {
                            const layoutName: PredefinedLayouts = PredefinedLayouts[layoutKey];

                            const imageURL: string =
                                `/libs/themes/${themeName}/assets/images/branding/layouts/${layoutName}.svg`;

                            return (
                                <Field.Radio
                                    key={ index }
                                    ariaLabel={ `${layoutName} layout swatch` }
                                    name="layout.activeLayout"
                                    label={
                                        t(
                                            "extensions:develop.branding.forms.design."
                                                + `layout.variations.fields.${
                                                    layoutName
                                                }.label`
                                        )
                                    }
                                    required={ false }
                                    readOnly={ readOnly }
                                    value={ layoutName }
                                    component={ LayoutSwatchAdapter }
                                    image={
                                        {
                                            altText: t("extensions:develop.branding.forms.design."
                                                + `layout.variations.fields.${
                                                    layoutName
                                                }.imgAlt`),
                                            imgURL: imageURL
                                        }
                                    }
                                    data-componentid={ `${componentId}-${layoutName}-layout-swatch` }
                                    premium={ layoutName === PredefinedLayouts.CUSTOM }
                                    listen={ () => {
                                        setLayout({
                                            ...layout,
                                            activeLayout: layoutName
                                        });
                                    } }
                                />
                            );
                        })
                }
            </div>
            {
                layout.activeLayout === PredefinedLayouts.CUSTOM
                    ? null
                    : (
                        <div>
                            <Heading as="h4">
                                { t("extensions:develop.branding.tabs.design.sections.themeVariation.heading") }
                            </Heading>
                            <Text muted compact>
                                <Trans
                                    i18nKey={
                                        "extensions:develop.branding.tabs.design.sections.themeVariation.description"
                                    }
                                    tOptions={ {
                                        productName: productName
                                    } }
                                >
                                    Select a color theme for your interfaces. You can further customize
                                    these themes using the options given below. By default, the light theme
                                    ({ productName } theme) is selected.
                                </Trans>
                            </Text>
                        </div>
                    )
            }
            {
                layout.activeLayout === PredefinedLayouts.CUSTOM
                    ? null
                    : (
                        <div>
                            {

                                Object.keys(BrandingPreferenceMeta.getThemes())
                                    .map((_theme: PredefinedThemes, index: number) => {
                                        const meta: ThemeSwatchUIConfigsInterface = BrandingPreferenceMeta
                                            .getThemeSwatchConfigs(_theme as PredefinedThemes);

                                        return (
                                            <Field.Radio
                                                key={ index }
                                                ariaLabel={ `${_theme} Theme swatch` }
                                                name="theme.activeTheme"
                                                label={
                                                    t(
                                                        "extensions:develop.branding.forms.design."
                                                            + `theme.variations.fields.${
                                                                _theme.toLocaleLowerCase()
                                                            }.label`
                                                    )
                                                }
                                                required={ false }
                                                readOnly={ readOnly }
                                                value={ _theme }
                                                component={ ThemeSwatchAdapter }
                                                colors={ meta.colors }
                                                data-componentid={ `${componentId}-${_theme}-theme-swatch` }
                                                listen={ () => setTheme({
                                                    ...theme,
                                                    activeTheme: _theme
                                                }) }
                                            />
                                        );
                                    })
                            }
                        </div>
                    )
            }

            {
                layout.activeLayout === PredefinedLayouts.CUSTOM
                    ? (
                        <div>
                            <Heading as="h4">
                                { t("extensions:develop.branding.tabs.design.sections.imagePreferences.heading") }
                            </Heading>
                            <Text muted compact>
                                { t("extensions:develop.branding.tabs.design.sections.imagePreferences.description") }
                            </Text>
                        </div>
                    )
                    : (
                        <div>
                            <Heading as="h4">
                                { t("extensions:develop.branding.tabs.design.sections.themePreferences.heading") }
                            </Heading>
                            <Text muted compact>
                                { t("extensions:develop.branding.tabs.design.sections.themePreferences.description") }
                            </Text>
                        </div>
                    )
            }

            <SegmentedAccordion
                fluid
                className="design-preferences-accordion"
                data-componentid={ `${componentId}-accordion` }
            >
                {
                    layout.activeLayout === PredefinedLayouts.CUSTOM
                        ? renderImageFields()
                        : (
                            <React.Fragment>
                                <SegmentedAccordion.Title
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.IMAGES) }
                                    index={ ACCORDION_TAB_INDEXES.IMAGES }
                                    data-componentid={ `${componentId}-images-accordion-item` }
                                    onClick={ handleAccordionOnClick }
                                >
                                    <Heading as="h5">
                                        { t("extensions:develop.branding.forms.design.theme.images.heading") }
                                    </Heading>
                                </SegmentedAccordion.Title>
                                <SegmentedAccordion.Content
                                    secondary={ false }
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.IMAGES) }
                                    data-componentid={ `${componentId}-images-accordion-content` }
                                >
                                    { renderImageFields() }
                                </SegmentedAccordion.Content>
                                { /* Color Palette */ }
                                <SegmentedAccordion.Title
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.COLORS) }
                                    index={ ACCORDION_TAB_INDEXES.COLORS }
                                    data-componentid={ `${componentId}-color-palette-accordion-item` }
                                    onClick={ handleAccordionOnClick }
                                >
                                    <Heading as="h5">
                                        { t("extensions:develop.branding.forms.design.theme.colors.heading") }
                                    </Heading>
                                </SegmentedAccordion.Title>
                                <SegmentedAccordion.Content
                                    secondary={ false }
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.COLORS) }
                                    data-componentid={ `${componentId}-color-palette-accordion-content` }
                                >
                                    { renderColorPaletteFields() }
                                </SegmentedAccordion.Content>

                                { /* Page Preferences */ }
                                <SegmentedAccordion.Title
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.PAGE) }
                                    index={ ACCORDION_TAB_INDEXES.PAGE }
                                    data-componentid={ `${componentId}-page-accordion-item` }
                                    onClick={ handleAccordionOnClick }
                                >
                                    <Heading as="h5">
                                        { t("extensions:develop.branding.forms.design.theme.page.heading") }
                                    </Heading>
                                </SegmentedAccordion.Title>
                                <SegmentedAccordion.Content
                                    secondary={ false }
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.PAGE) }
                                    data-componentid={ `${componentId}-page-accordion-content` }
                                >
                                    { renderPageFields() }
                                </SegmentedAccordion.Content>


                                { /* Footer Preferences */ }
                                <SegmentedAccordion.Title
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.FOOTER) }
                                    index={ ACCORDION_TAB_INDEXES.FOOTER }
                                    data-componentid={ `${componentId}-footer-accordion-item` }
                                    onClick={ handleAccordionOnClick }
                                >
                                    <Heading as="h5">
                                        { t("extensions:develop.branding.forms.design.theme.footer.heading") }
                                    </Heading>
                                </SegmentedAccordion.Title>
                                <SegmentedAccordion.Content
                                    secondary={ false }
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.FOOTER) }
                                    data-componentid={ `${componentId}-footer-accordion-content` }
                                >
                                    { renderFooterFields() }
                                </SegmentedAccordion.Content>

                                { /* Typography Preferences */ }
                                <SegmentedAccordion.Title
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.TYPOGRAPHY) }
                                    index={ ACCORDION_TAB_INDEXES.TYPOGRAPHY }
                                    data-componentid={ `${componentId}-typography-accordion-item` }
                                    onClick={ handleAccordionOnClick }
                                >
                                    <Heading as="h5">
                                        { t("extensions:develop.branding.forms.design.theme.font.heading") }
                                    </Heading>
                                </SegmentedAccordion.Title>
                                <SegmentedAccordion.Content
                                    secondary={ false }
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.TYPOGRAPHY) }
                                    data-componentid={ `${componentId}-typography-accordion-content` }
                                >
                                    { renderTypographyFields() }
                                </SegmentedAccordion.Content>

                                { /* Headings Preferences */ }
                                <SegmentedAccordion.Title
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.HEADINGS) }
                                    index={ ACCORDION_TAB_INDEXES.HEADINGS }
                                    data-componentid={ `${componentId}-headings-accordion-item` }
                                    onClick={ handleAccordionOnClick }
                                >
                                    <Heading as="h5">
                                        { t("extensions:develop.branding.forms.design.theme.headings.heading") }
                                    </Heading>
                                </SegmentedAccordion.Title>
                                <SegmentedAccordion.Content
                                    secondary={ false }
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.HEADINGS) }
                                    data-componentid={ `${componentId}-headings-accordion-content` }
                                >
                                    { renderHeadingsFields() }
                                </SegmentedAccordion.Content>

                                { /* Button Preferences */ }
                                <SegmentedAccordion.Title
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.BUTTONS) }
                                    index={ ACCORDION_TAB_INDEXES.BUTTONS }
                                    data-componentid={ `${componentId}-buttons-accordion-item` }
                                    onClick={ handleAccordionOnClick }
                                >
                                    <Heading as="h5">
                                        { t("extensions:develop.branding.forms.design.theme.buttons.heading") }
                                    </Heading>
                                </SegmentedAccordion.Title>
                                <SegmentedAccordion.Content
                                    secondary={ false }
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.BUTTONS) }
                                    data-componentid={ `${componentId}-buttons-accordion-content` }
                                >
                                    { renderButtonsFields() }
                                </SegmentedAccordion.Content>

                                { /* Login Box Preferences */ }
                                <SegmentedAccordion.Title
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.LOGIN_BOX) }
                                    index={ ACCORDION_TAB_INDEXES.LOGIN_BOX }
                                    data-componentid={ `${componentId}-login-box-accordion-item` }
                                    onClick={ handleAccordionOnClick }
                                >
                                    <Heading as="h5">
                                        { t("extensions:develop.branding.forms.design.theme.loginBox.heading") }
                                    </Heading>
                                </SegmentedAccordion.Title>
                                <SegmentedAccordion.Content
                                    secondary={ false }
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.LOGIN_BOX) }
                                    data-componentid={ `${componentId}-login-box-accordion-content` }
                                >
                                    { renderLoginBoxFields() }
                                </SegmentedAccordion.Content>

                                { /* Input Field Preferences */ }
                                <SegmentedAccordion.Title
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.INPUTS) }
                                    index={ ACCORDION_TAB_INDEXES.INPUTS }
                                    data-componentid={ `${componentId}-inputs-accordion-item` }
                                    onClick={ handleAccordionOnClick }
                                >
                                    <Heading as="h5">
                                        { t("extensions:develop.branding.forms.design.theme.inputs.heading") }
                                    </Heading>
                                </SegmentedAccordion.Title>
                                <SegmentedAccordion.Content
                                    secondary={ false }
                                    active={ accordionActiveIndexes.includes(ACCORDION_TAB_INDEXES.INPUTS) }
                                    data-componentid={ `${componentId}-inputs-accordion-content` }
                                >
                                    { renderInputFields() }
                                </SegmentedAccordion.Content>
                            </React.Fragment>
                        )
                }
            </SegmentedAccordion>
        </Form>
    );
});

/**
 * Default props for the component.
 */
DesignForm.defaultProps = {
    "data-componentid": "design-form"
};
