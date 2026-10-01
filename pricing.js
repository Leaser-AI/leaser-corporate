const pricingDialog = document.querySelector("#pricing-dialog");
const pricingForm = document.querySelector("#pricing-form");

if (pricingDialog && pricingForm) {
  let opener = null;

  document.querySelectorAll("[data-open-pricing]").forEach((button) => {
    button.addEventListener("click", () => {
      opener = button;
      const mode = button.dataset.mode;
      if (mode) {
        const choice = [...pricingForm.elements.mode].find((input) => input.value === mode);
        if (choice) choice.checked = true;
      }
      pricingDialog.showModal();
      pricingForm.elements.name.focus();
    });
  });

  document.querySelector("[data-close-pricing]").addEventListener("click", () => pricingDialog.close());
  pricingDialog.addEventListener("close", () => opener?.focus());
  pricingDialog.addEventListener("click", (event) => {
    if (event.target === pricingDialog) pricingDialog.close();
  });

  pricingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = new FormData(pricingForm);
    const subject = `Leaser pricing request — ${values.get("company")}`;
    const body = [
      "Please contact me about Leaser pricing.",
      "",
      `Operating model: ${values.get("mode")}`,
      `Name: ${values.get("name")}`,
      `Work email: ${values.get("email")}`,
      `Company: ${values.get("company")}`,
      `Properties: ${values.get("properties")}`,
      `Approximate units: ${values.get("units")}`,
      `What we need help with: ${values.get("goals") || "Not specified"}`,
    ].join("\n");
    window.location.href = `mailto:leasing@leaserai.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
