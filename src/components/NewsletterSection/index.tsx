import { useEffect } from "preact/hooks";
import {
  customerStore,
  getNewsletterSubscriptionForm,
  initNewsletterSubscriptionForm,
  setNewsletterSubscriptionFormEmail,
  submitNewsletterSubscriptionForm,
  getThemeSetting,
} from "@ikas/bp-storefront";
import { Button } from "../Button";
import { Props } from "./types";

export interface NewsletterSectionProps extends Props {
  className?: string;
}

export function NewsletterSection({
  title = "Yeniliklerden ve Fırsatlardan Haberdar Olun",
  subtitle = "E-posta adresinizle kayıt olun, ilk siparişinizde %10 indirim kazanın.",
  placeholder = "E-posta adresinizi giriniz",
  buttonText = "Abone Ol",
  backgroundColor,
  className = "",
}: NewsletterSectionProps) {
  const newsletterForm = getNewsletterSubscriptionForm(customerStore);

  useEffect(() => {
    if (newsletterForm) {
      initNewsletterSubscriptionForm(newsletterForm);
    }
  }, [newsletterForm]);

  // Read live global settings via getThemeSetting using exact variableNames from prompts/TOKENS.md
  const radiusSetting = getThemeSetting("_iI8H4rllzj"); // Radius / Input ve Form (0.5rem / 8px)
  const buttonHeightSetting = getThemeSetting("_2xLGYXCG2n"); // Boşluk / Buton Yüksekliği (48px)
  const verticalPySetting = getThemeSetting("_Kl0my3VVMA"); // Boşluk / Masaüstü Dikey Spacing (48px)
  const verticalPyMobileSetting = getThemeSetting("_5Fdl1j6UHQ"); // Boşluk / Dikey Bölüm Spacing (2rem / 32px)
  const sectionPxSetting = getThemeSetting("_Nd1XnRyZlx"); // Boşluk / Masaüstü Yatay Bölüm Padding (20px)
  const mobilePxSetting = getThemeSetting("_uRDipxnxkx"); // Boşluk / Mobil Yatay Padding (16px)

  const inputRadius = radiusSetting?.value || "8px";
  const buttonHeight = buttonHeightSetting?.value || "48px";
  const sectionPy = verticalPySetting?.value || "48px";
  const sectionPyMobile = verticalPyMobileSetting?.value || "32px";
  const sectionPx = sectionPxSetting?.value || "20px";
  const mobilePx = mobilePxSetting?.value || "16px";

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--input-radius": inputRadius,
    "--button-height": buttonHeight,
    "--section-py": sectionPy,
    "--section-py-mobile": sectionPyMobile,
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!newsletterForm || newsletterForm.isSubmitting) return;
    await submitNewsletterSubscriptionForm(newsletterForm);
  };

  const emailField = newsletterForm?.email;
  const isError = emailField?.hasError;
  const errorMessage = emailField?.message || "Lütfen geçerli bir e-posta adresi giriniz.";
  const isSuccess = newsletterForm?.isSuccess;

  return (
    <section
      className={`ikas-newsletter ${className}`.trim()}
      style={inlineStyles}
    >
      <div className="ikas-newsletter__container">
        {title && (
          <h2 className="ikas-newsletter__title _sKAMD8d1LA">{title}</h2>
        )}

        {subtitle && (
          <p className="ikas-newsletter__subtitle _VcfI5D07Nt">{subtitle}</p>
        )}

        {isSuccess ? (
          <div className="ikas-newsletter__success-msg _VcfI5D07Nt" role="alert">
            {newsletterForm?.responseMessage ||
              "Bültenimize başarıyla kaydoldunuz! Teşekkür ederiz."}
          </div>
        ) : (
          <form
            className="ikas-newsletter__form"
            onSubmit={handleSubmit}
            aria-label="E-Bülten Aboneliği"
            noValidate
          >
            <div className="ikas-newsletter__form-row">
              <div className="ikas-newsletter__input-wrapper">
                <label htmlFor="geeny-newsletter-email" className="visually-hidden">
                  E-Posta Adresi
                </label>
                <input
                  id="geeny-newsletter-email"
                  type="email"
                  className={`ikas-newsletter__input ${
                    isError ? "ikas-newsletter__input--error" : ""
                  }`}
                  placeholder={placeholder}
                  value={emailField?.value ?? ""}
                  onInput={(e: Event) =>
                    newsletterForm &&
                    setNewsletterSubscriptionFormEmail(
                      newsletterForm,
                      (e.target as HTMLInputElement).value
                    )
                  }
                  required
                  aria-invalid={isError ? "true" : "false"}
                />
                {isError && (
                  <p className="ikas-newsletter__error-msg _eZyocyyd0F" role="alert">
                    {errorMessage}
                  </p>
                )}
              </div>

              <div className="ikas-newsletter__button-wrapper">
                <Button
                  text={buttonText}
                  variant="ACCENT"
                  size="NORMAL"
                  disabled={newsletterForm?.isSubmitting}
                  loading={newsletterForm?.isSubmitting}
                  ariaLabel="E-Bülten Aboneliğini Gönder"
                />
              </div>
            </div>

            {newsletterForm?.isFailure && newsletterForm.responseMessage && (
              <p className="ikas-newsletter__error-msg _eZyocyyd0F" role="alert">
                {newsletterForm.responseMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

export default NewsletterSection;
