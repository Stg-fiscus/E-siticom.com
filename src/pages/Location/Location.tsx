export const Location = () => {
  return (
    <div className="mx-[10vw] mt-10 flex flex-col items-center justify-center">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d167.1183961254008!2d106.9207312!3d47.9190819!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d969300489a127d%3A0xb53e3b2fb5f8fe3d!2z0KHQsNC90YXSr9Kv0LPQuNC50L0g0KLQvtC-0YbQvtC-0LvQvtGFINCT0YDRg9C_0L8g0KXQpdCa!5e0!3m2!1sen!2smn!4v1715220239392!5m2!1sen!2smn"
        width="900"
        height="675"
        className="hidden md:block"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d167.1183961254008!2d106.9207312!3d47.9190819!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d969300489a127d%3A0xb53e3b2fb5f8fe3d!2z0KHQsNC90YXSr9Kv0LPQuNC50L0g0KLQvtC-0YbQvtC-0LvQvtGFINCT0YDRg9C_0L8g0KXQpdCa!5e0!3m2!1sen!2smn!4v1715220239392!5m2!1sen!2smn"
        width="600"
        height="450"
        className="hidden sm:block md:hidden"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d334.2369078923458!2d106.920496!3d47.919064!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d969300489a127d%3A0xb53e3b2fb5f8fe3d!2z0KHQsNC90YXSr9Kv0LPQuNC50L0g0KLQvtC-0YbQvtC-0LvQvtGFINCT0YDRg9C_0L8g0KXQpdCa!5e0!3m2!1sen!2smn!4v1715228786151!5m2!1sen!2smn"
        width="360"
        height="270"
        className="block sm:hidden"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <p className="text-md mt-4">
        Сүхбаатар дүүрэг 8-р хороо, Б.Алтангэрэлийн гудамж-5, Сити-Центр төв,
        201 тоот
      </p>
    </div>
  );
};
