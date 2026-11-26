// The Work With Us form, which is sent with EmailJS.

(function() {
  const form = document.getElementById("workForm");
  const status = document.getElementById("workStatus");
  const send = form.querySelector(".work-send");
  const { message, name, email } = form.elements;
  const needBoxes = Array.from(form.querySelectorAll("[name=need]"));

  const PROMPTS = {
    "Package": "We need a package that…",
    "Bug fix": "This Flutter bug is upsetting our customers…",
    "Feature": "We need Flutter to…",
  };

  function checkedNeeds() {
    return needBoxes.filter((box) => box.checked).map((box) => box.value);
  }

  // Prompts for a message about whatever is checked.
  function updatePrompt() {
    const needs = checkedNeeds();
    if (needs.length === 0) {
      message.placeholder = "What does your app need?";
    } else if (needs.length === 1) {
      message.placeholder = PROMPTS[needs[0]];
    } else {
      const names = needs.map((need) => need.toLowerCase());
      message.placeholder = `Tell us about the ${names.slice(0, -1).join(", ")} and ${names[names.length - 1]} you need…`;
    }
  }

  function showStatus(text, isError) {
    status.textContent = text;
    status.toggleAttribute("data-error", isError);
  }

  function setInvalid(fields, isInvalid) {
    fields.forEach((field) => {
      if (isInvalid) {
        field.setAttribute("aria-invalid", "true");
      } else {
        field.removeAttribute("aria-invalid");
      }
    });
  }

  // Returns the first problem with the form, and marks every field that has one.
  function validate() {
    const checks = [
      { fields: [name], isInvalid: name.value.trim() === "", text: "Enter your name." },
      { fields: [email], isInvalid: email.value.trim() === "" || !email.validity.valid, text: "Enter a valid email address." },
      { fields: [message], isInvalid: message.value.trim() === "", text: "Tell us what you need." },
      { fields: needBoxes, isInvalid: checkedNeeds().length === 0, text: "Select at least one: package, bug fix, or feature." },
    ];
    checks.forEach(({ fields, isInvalid }) => setInvalid(fields, isInvalid));
    return checks.find(({ isInvalid }) => isInvalid);
  }

  form.addEventListener("change", updatePrompt);

  form.addEventListener("input", (e) => {
    setInvalid(needBoxes.includes(e.target) ? needBoxes : [e.target], false);
    showStatus("", false);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const problem = validate();
    if (problem) {
      showStatus(problem.text, true);
      problem.fields[0].focus();
      return;
    }

    send.disabled = true;
    showStatus("Sending…", false);

    emailjs.send("service_vcpx8t4", "template_fbh", {
      "reply_to": email.value.trim(),
      "from_name": name.value.trim(),
      "message": `Needs: ${checkedNeeds().join(", ")}\n\n${message.value.trim()}`,
    }).then(() => {
      form.reset();
      updatePrompt();
      showStatus("Thanks. We got your message, and we'll reply by email.", false);
    }).catch(() => {
      showStatus("Your message didn't send. Try again, or reach Matt on X at @SuprDeclarative.", true);
    }).finally(() => {
      send.disabled = false;
    });
  });

  // Browsers can restore checked boxes when returning to the page.
  updatePrompt();
})();
