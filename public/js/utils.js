function rupiah(number) {

  return new Intl.NumberFormat(
    "id-ID"
  ).format(number);

}

function getQuery(name) {

  const params =
    new URLSearchParams(
      window.location.search
    );

  return params.get(name);

}
