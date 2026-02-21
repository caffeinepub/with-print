import Text "mo:core/Text";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import BlobStorage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type PaymentConfirmation = {
    name : Text;
    email : Text;
    phone : Text;
    utr : Text;
    screenshot : BlobStorage.ExternalBlob;
  };

  module PaymentConfirmation {
    public func compare(a : PaymentConfirmation, b : PaymentConfirmation) : Order.Order {
      switch (Text.compare(a.name, b.name)) {
        case (#equal) { Text.compare(a.utr, b.utr) };
        case (other) { other };
      };
    };
  };

  let confirmations = Map.empty<Text, PaymentConfirmation>();

  public shared ({ caller }) func submitPayment(
    name : Text,
    email : Text,
    phone : Text,
    utr : Text,
    screenshot : BlobStorage.ExternalBlob,
  ) : async () {
    if (confirmations.containsKey(utr)) {
      Runtime.trap("Payment confirmation with UTR " # utr # " already exists.");
    };

    let confirmation : PaymentConfirmation = {
      name;
      email;
      phone;
      utr;
      screenshot;
    };
    confirmations.add(utr, confirmation);
  };

  public query ({ caller }) func getPaymentConfirmation(utr : Text) : async PaymentConfirmation {
    switch (confirmations.get(utr)) {
      case (null) { Runtime.trap("No confirmation found for UTR: " # utr) };
      case (?confirmation) { confirmation };
    };
  };
};
