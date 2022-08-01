const data = [
  {
    id: 1,
    type: "inbox",
    subject: "React Tutorial with Donald",
    body: "React is a JavaScript framework for building web applications.",
    from: "example@packmail.com",
    to: "anotherexample@packmail",
    sender: "John Doe",
    time: Date.now(),
  },
  {
    id: 2,
    type: "inbox",
    subject: "VueJS Tutorial with Rose",
    body:
      "Vue is a JavaScript framework for building web applications. Vue is a JavaScript framework for building web applications.",
    from: "example@packmail.com",
    to: "anotherexample@packmail",
    sender: "Rose Doe",
    time: Date.now(),
    isNew: true,
  },
  {
    id: 3,
    type: "inbox",
    subject: "VueJS Tutorial with Rose",
    body:
      "Vue is a JavaScript framework for building web applications. Vue is a JavaScript framework for building web applications.",
    from: "example@packmail.com",
    to: "anotherexample@packmail",
    sender: "Rose Doe",
    time: 1560211200000,
  },
];

const contacts = [
  {
    id: "hns_ksuiFya27k",
    name: "John Doe",
    email: "johndoe@john.com",
  },
  {
    id: "hns_ksui8787Fya27k",
    name: "Rex Mark",
    email: "rexma@rm.com",
  },
  {
    id: "hGGy78a_ujs2YUJ",
    name: "Mason ",
    email: "happymason@gomo.mo",
  },
];

module.exports = {
  data,
  users: contacts
}
