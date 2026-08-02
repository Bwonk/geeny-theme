import { useEffect, useState } from "preact/hooks";
import {
  customerStore,
  IkasCustomerAddress,
  deleteCustomerAddress,
  getCustomerAddressText,
  getEmptyAddressForm,
  getIkasCustomerAddressForm,
  initAddressForm,
  submitAddressForm,
  setAddressFormTitle,
  setAddressFormFirstName,
  setAddressFormLastName,
  setAddressFormPhone,
  setAddressFormAddressLine1,
  setAddressFormAddressLine2,
  setAddressFormCity,
  setAddressFormPostalCode,
  setAddressFormCountry,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import Button from "../Button";

export interface Props {
  title?: string;
  emptyText?: string;
  addAddressText?: string;
  editAddressText?: string;
  deleteAddressText?: string;
  cancelText?: string;
  saveButtonText?: string;
  savingButtonText?: string;
  modalTitleAdd?: string;
  modalTitleEdit?: string;
  deleteConfirmTitle?: string;
  deleteConfirmMessage?: string;
  addressTitleLabel?: string;
  firstNameLabel?: string;
  lastNameLabel?: string;
  phoneLabel?: string;
  addressLineLabel?: string;
  cityLabel?: string;
  postalCodeLabel?: string;
  countryLabel?: string;
}

const AddressFormModal = observer(function AddressFormModal({
  address,
  modalTitle,
  saveButtonText,
  savingButtonText,
  cancelText,
  addressTitleLabel,
  firstNameLabel,
  lastNameLabel,
  phoneLabel,
  addressLineLabel,
  cityLabel,
  postalCodeLabel,
  countryLabel,
  onClose,
}: {
  address?: IkasCustomerAddress;
  modalTitle: string;
  saveButtonText: string;
  savingButtonText: string;
  cancelText: string;
  addressTitleLabel: string;
  firstNameLabel: string;
  lastNameLabel: string;
  phoneLabel: string;
  addressLineLabel: string;
  cityLabel: string;
  postalCodeLabel: string;
  countryLabel: string;
  onClose: () => void;
}) {
  const [ready, setReady] = useState(false);
  const [form] = useState(() =>
    address
      ? getIkasCustomerAddressForm(address)
      : getEmptyAddressForm(customerStore)
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await initAddressForm(form, address);
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = async (e: Event) => {
    e.preventDefault();
    const ok = await submitAddressForm(form);
    if (ok) onClose();
  };

  return (
    <div className="ikas-addr-modal" role="dialog" aria-modal="true">
      <button
        type="button"
        className="ikas-addr-modal__backdrop"
        aria-label={cancelText}
        onClick={onClose}
      />
      <div className="ikas-addr-modal__sheet">
        <h2 className="ikas-addr-modal__title">{modalTitle}</h2>

        {!ready ? (
          <div className="ikas-account__loading" aria-busy="true" />
        ) : (
          <form className="ikas-addr-modal__form" onSubmit={handleSave} noValidate>
            {form.isFailure && form.responseMessage && (
              <div className="ikas-account__banner ikas-account__banner--err">
                {form.responseMessage}
              </div>
            )}

            <label className="ikas-account__field">
              <span className="ikas-account__label">{addressTitleLabel}</span>
              <input
                className="ikas-account__input"
                value={form.title?.value ?? ""}
                onInput={(e) =>
                  setAddressFormTitle(form, (e.target as HTMLInputElement).value)
                }
              />
            </label>

            <div className="ikas-account__row">
              <label className="ikas-account__field">
                <span className="ikas-account__label">{firstNameLabel}</span>
                <input
                  className="ikas-account__input"
                  value={form.firstName?.value ?? ""}
                  onInput={(e) =>
                    setAddressFormFirstName(
                      form,
                      (e.target as HTMLInputElement).value
                    )
                  }
                />
              </label>
              <label className="ikas-account__field">
                <span className="ikas-account__label">{lastNameLabel}</span>
                <input
                  className="ikas-account__input"
                  value={form.lastName?.value ?? ""}
                  onInput={(e) =>
                    setAddressFormLastName(
                      form,
                      (e.target as HTMLInputElement).value
                    )
                  }
                />
              </label>
            </div>

            <label className="ikas-account__field">
              <span className="ikas-account__label">{phoneLabel}</span>
              <input
                className="ikas-account__input"
                type="tel"
                value={form.phone?.value ?? ""}
                onInput={(e) =>
                  setAddressFormPhone(form, (e.target as HTMLInputElement).value)
                }
              />
            </label>

            <label className="ikas-account__field">
              <span className="ikas-account__label">{addressLineLabel}</span>
              <input
                className="ikas-account__input"
                value={form.addressLine1?.value ?? ""}
                onInput={(e) =>
                  setAddressFormAddressLine1(
                    form,
                    (e.target as HTMLInputElement).value
                  )
                }
              />
            </label>

            <input
              className="ikas-account__input"
              value={form.addressLine2?.value ?? ""}
              onInput={(e) =>
                setAddressFormAddressLine2(
                  form,
                  (e.target as HTMLInputElement).value
                )
              }
              aria-label={addressLineLabel}
            />

            {(form.countryOptions?.length || 0) > 0 && (
              <label className="ikas-account__field">
                <span className="ikas-account__label">{countryLabel}</span>
                <select
                  className="ikas-account__input"
                  value={form.country?.value ?? ""}
                  onChange={(e) =>
                    setAddressFormCountry(
                      form,
                      (e.target as HTMLSelectElement).value
                    )
                  }
                >
                  <option value="" />
                  {form.countryOptions?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <div className="ikas-account__row">
              <label className="ikas-account__field">
                <span className="ikas-account__label">{cityLabel}</span>
                {(form.cityOptions?.length || 0) > 0 && !form.city?.isFreeText ? (
                  <select
                    className="ikas-account__input"
                    value={form.city?.value ?? ""}
                    onChange={(e) =>
                      setAddressFormCity(
                        form,
                        (e.target as HTMLSelectElement).value
                      )
                    }
                  >
                    <option value="" />
                    {form.cityOptions?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="ikas-account__input"
                    value={form.city?.value ?? ""}
                    onInput={(e) =>
                      setAddressFormCity(
                        form,
                        (e.target as HTMLInputElement).value
                      )
                    }
                  />
                )}
              </label>
              <label className="ikas-account__field">
                <span className="ikas-account__label">{postalCodeLabel}</span>
                <input
                  className="ikas-account__input"
                  value={form.postalCode?.value ?? ""}
                  onInput={(e) =>
                    setAddressFormPostalCode(
                      form,
                      (e.target as HTMLInputElement).value
                    )
                  }
                />
              </label>
            </div>

            <div className="ikas-addr-modal__actions">
              <Button
                text={cancelText}
                variant="PILL_SECONDARY"
                size="NORMAL"
                onClick={onClose}
              />
              <Button
                text={form.isSubmitting ? savingButtonText : saveButtonText}
                variant="PILL_PRIMARY"
                size="NORMAL"
                disabled={form.isSubmitting}
                loading={form.isSubmitting}
                onClick={(e) => void handleSave(e)}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
});

export function AccountAddressesPanel({
  title = "Adreslerim",
  emptyText = "Kayıtlı adresin yok.",
  addAddressText = "ADRES EKLE",
  editAddressText = "DÜZENLE",
  deleteAddressText = "SİL",
  cancelText = "İPTAL",
  saveButtonText = "KAYDET",
  savingButtonText = "KAYDEDİLİYOR...",
  modalTitleAdd = "Yeni adres",
  modalTitleEdit = "Adresi düzenle",
  deleteConfirmTitle = "Adresi sil",
  deleteConfirmMessage = "Bu adresi silmek istediğine emin misin?",
  addressTitleLabel = "BAŞLIK",
  firstNameLabel = "AD",
  lastNameLabel = "SOYAD",
  phoneLabel = "TELEFON",
  addressLineLabel = "ADRES",
  cityLabel = "ŞEHİR",
  postalCodeLabel = "POSTA KODU",
  countryLabel = "ÜLKE",
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<IkasCustomerAddress | undefined>();
  const [deleting, setDeleting] = useState<IkasCustomerAddress | undefined>();

  const addresses = customerStore.customer?.addresses ?? [];

  const openAdd = () => {
    setEditing(undefined);
    setModalOpen(true);
  };
  const openEdit = (addr: IkasCustomerAddress) => {
    setEditing(addr);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    await deleteCustomerAddress(customerStore, deleting);
    setDeleting(undefined);
  };

  return (
    <div className="ikas-account__panel">
      <div className="ikas-account__panel-head">
        <h1 className="ikas-account__title _sKAMD8d1LA">{title}</h1>
        {addresses.length > 0 && (
          <Button
            text={addAddressText}
            variant="PILL_ACCENT"
            size="NORMAL"
            onClick={openAdd}
          />
        )}
      </div>

      {addresses.length === 0 ? (
        <div className="ikas-account__empty-block">
          <p className="ikas-account__empty">{emptyText}</p>
          <Button
            text={addAddressText}
            variant="PILL_ACCENT"
            size="NORMAL"
            onClick={openAdd}
          />
        </div>
      ) : (
        <ul className="ikas-account-addrs">
          {addresses.map((addr) => (
            <li key={addr.id} className="ikas-account-addrs__card">
              {addr.title && (
                <span className="ikas-account-addrs__title">{addr.title}</span>
              )}
              <p className="ikas-account-addrs__text">
                {getCustomerAddressText(addr)}
              </p>
              <div className="ikas-account-addrs__actions">
                <Button
                  text={editAddressText}
                  variant="PILL_SECONDARY"
                  size="NORMAL"
                  onClick={() => openEdit(addr)}
                />
                <Button
                  text={deleteAddressText}
                  variant="PILL_SECONDARY"
                  size="NORMAL"
                  onClick={() => setDeleting(addr)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {modalOpen && (
        <AddressFormModal
          key={editing?.id || "new"}
          address={editing}
          modalTitle={editing ? modalTitleEdit : modalTitleAdd}
          saveButtonText={saveButtonText}
          savingButtonText={savingButtonText}
          cancelText={cancelText}
          addressTitleLabel={addressTitleLabel}
          firstNameLabel={firstNameLabel}
          lastNameLabel={lastNameLabel}
          phoneLabel={phoneLabel}
          addressLineLabel={addressLineLabel}
          cityLabel={cityLabel}
          postalCodeLabel={postalCodeLabel}
          countryLabel={countryLabel}
          onClose={() => {
            setModalOpen(false);
            setEditing(undefined);
          }}
        />
      )}

      {deleting && (
        <div className="ikas-addr-modal" role="dialog" aria-modal="true">
          <button
            type="button"
            className="ikas-addr-modal__backdrop"
            aria-label={cancelText}
            onClick={() => setDeleting(undefined)}
          />
          <div className="ikas-addr-modal__sheet ikas-addr-modal__sheet--sm">
            <h2 className="ikas-addr-modal__title">{deleteConfirmTitle}</h2>
            <p className="ikas-account__empty">{deleteConfirmMessage}</p>
            <div className="ikas-addr-modal__actions">
              <Button
                text={cancelText}
                variant="PILL_SECONDARY"
                size="NORMAL"
                onClick={() => setDeleting(undefined)}
              />
              <Button
                text={deleteAddressText}
                variant="PILL_PRIMARY"
                size="NORMAL"
                onClick={() => void confirmDelete()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default observer(AccountAddressesPanel);
