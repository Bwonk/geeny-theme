import { useState, useEffect } from "preact/hooks";
import {
  customerStore,
  getContactForm,
  initContactForm,
  submitContactForm,
  setContactFormFirstName,
  setContactFormLastName,
  setContactFormEmail,
  setContactFormPhone,
  setContactFormMessage,
  getThemeSetting,
} from "@ikas/bp-storefront";
import Button from "../../sub-components/Button";
import { Props } from "./types";

export function PageContentWrapper({
  content,
  showContactForm = false,
  formTitle = "İLETİŞİME GEÇİN",
  formDescription = "Sorularınız ve önerileriniz için aşağıdaki formu doldurabilirsiniz.",
  submitButtonText = "GÖNDER",
  successMessage = "Mesajınız başarıyla iletilmiştir. En kısa sürede dönüş yapacağız.",
  errorMessage = "Lütfen tüm zorunlu alanları eksiksiz ve doğru doldurunuz.",
  backgroundColor,
}: Props) {
  // Read live global settings via getThemeSetting using exact variableNames from prompts/TOKENS.md
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ");
  const sectionPxSetting = getThemeSetting("_Nd1XnRyZlx");
  const mobilePxSetting = getThemeSetting("_uRDipxnxkx");
  const verticalPySetting = getThemeSetting("_Kl0my3VVMA");
  const verticalPyMobileSetting = getThemeSetting("_5Fdl1j6UHQ");
  const gridGapSetting = getThemeSetting("_4Ud47RIVna");
  const mobileGridGapSetting = getThemeSetting("_dBvnJWALXD");
  const inputRadiusSetting = getThemeSetting("_iI8H4rllzj");

  const maxSiteWidth = siteWidthSetting?.value || "1560px";
  const sectionPx = sectionPxSetting?.value || "20px";
  const mobilePx = mobilePxSetting?.value || "16px";
  const sectionPy = verticalPySetting?.value || "48px";
  const sectionPyMobile = verticalPyMobileSetting?.value || "32px";
  const gridGap = gridGapSetting?.value || "20px";
  const mobileGridGap = mobileGridGapSetting?.value || "12px";
  const inputRadius = inputRadiusSetting?.value || "8px";

  const containerStyle = {
    backgroundColor: backgroundColor || "var(--24KlcgGmm9)",
    "--max-site-width": maxSiteWidth,
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
    "--section-py": sectionPy,
    "--section-py-mobile": sectionPyMobile,
    "--grid-gap": gridGap,
    "--mobile-grid-gap": mobileGridGap,
    "--input-radius": inputRadius,
  };

  // Form state management
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (showContactForm) {
      try {
        const form = getContactForm(customerStore);
        if (form) {
          initContactForm(form);
        }
      } catch (err) {
        console.error("Contact form initialization error:", err);
      }
    }
  }, [showContactForm]);

  const handleInputChange = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    try {
      const form = getContactForm(customerStore);
      if (form) {
        switch (field) {
          case "firstName":
            setContactFormFirstName(form, value);
            break;
          case "lastName":
            setContactFormLastName(form, value);
            break;
          case "email":
            setContactFormEmail(form, value);
            break;
          case "phone":
            setContactFormPhone(form, value);
            break;
          case "message":
            setContactFormMessage(form, value);
            break;
        }
      }
    } catch (err) {
      console.error(`Error updating contact form field ${field}:`, err);
    }
  };

  const handleSubmit = async (e?: any) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      const form = getContactForm(customerStore);
      if (!form) {
        setStatus({ type: "error", text: errorMessage });
        setIsSubmitting(false);
        return;
      }

      const success = await submitContactForm(form);
      if (success) {
        setStatus({ type: "success", text: successMessage });
        initContactForm(form);
        setFormState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setStatus({ type: "error", text: errorMessage });
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setStatus({ type: "error", text: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedFormTitle = formTitle ? formTitle.toLocaleUpperCase("tr-TR") : "";

  return (
    <section className="geeny-page-content" style={containerStyle} lang="tr">
      <div className="geeny-page-content__container">
        {/* Rich Text / HTML Content */}
        {content && (
          <div
            className="geeny-page-content__rich-text _VcfI5D07Nt"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        {/* Contact Form Area */}
        {showContactForm && (
          <div className="geeny-page-content__form-wrapper">
            <div className="geeny-page-content__form-header">
              <h2 className="geeny-page-content__form-title _sKAMD8d1LA">
                {formattedFormTitle}
              </h2>
              {formDescription && (
                <p className="geeny-page-content__form-description _VcfI5D07Nt">
                  {formDescription}
                </p>
              )}
            </div>

            {status && (
              <div
                className={`geeny-page-content__status-alert geeny-page-content__status-alert--${status.type} _VcfI5D07Nt`}
                role="alert"
              >
                {status.text}
              </div>
            )}

            <form className="geeny-page-content__form" onSubmit={handleSubmit}>
              <div className="geeny-page-content__form-row">
                <div className="geeny-page-content__field">
                  <label className="geeny-page-content__label C0OZ8W7vYS" htmlFor="contact-first-name">
                    Adınız *
                  </label>
                  <input
                    id="contact-first-name"
                    type="text"
                    required
                    className="geeny-page-content__input _VcfI5D07Nt"
                    value={formState.firstName}
                    onInput={(e: any) => handleInputChange("firstName", e.target.value)}
                    placeholder="Adınızı giriniz"
                  />
                </div>

                <div className="geeny-page-content__field">
                  <label className="geeny-page-content__label C0OZ8W7vYS" htmlFor="contact-last-name">
                    Soyadınız *
                  </label>
                  <input
                    id="contact-last-name"
                    type="text"
                    required
                    className="geeny-page-content__input _VcfI5D07Nt"
                    value={formState.lastName}
                    onInput={(e: any) => handleInputChange("lastName", e.target.value)}
                    placeholder="Soyadınızı giriniz"
                  />
                </div>
              </div>

              <div className="geeny-page-content__form-row">
                <div className="geeny-page-content__field">
                  <label className="geeny-page-content__label C0OZ8W7vYS" htmlFor="contact-email">
                    E-Posta Adresiniz *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    className="geeny-page-content__input _VcfI5D07Nt"
                    value={formState.email}
                    onInput={(e: any) => handleInputChange("email", e.target.value)}
                    placeholder="ornek@domain.com"
                  />
                </div>

                <div className="geeny-page-content__field">
                  <label className="geeny-page-content__label C0OZ8W7vYS" htmlFor="contact-phone">
                    Telefon Numarası
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    className="geeny-page-content__input _VcfI5D07Nt"
                    value={formState.phone}
                    onInput={(e: any) => handleInputChange("phone", e.target.value)}
                    placeholder="0 (5XX) XXX XX XX"
                  />
                </div>
              </div>

              <div className="geeny-page-content__field">
                <label className="geeny-page-content__label C0OZ8W7vYS" htmlFor="contact-message">
                  Mesajınız *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  className="geeny-page-content__textarea _VcfI5D07Nt"
                  value={formState.message}
                  onInput={(e: any) => handleInputChange("message", e.target.value)}
                  placeholder="Mesajınızı detaylı şekilde yazınız..."
                />
              </div>

              <div className="geeny-page-content__form-submit">
                <Button
                  text={submitButtonText}
                  variant="PRIMARY"
                  size="LARGE"
                  fullWidth
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default PageContentWrapper;

