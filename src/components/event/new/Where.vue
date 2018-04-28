<template>
  <div class="step-container">
    <div class="step-header has-text-centered">
      <div class="step-subtitle">
        EVENT LOCATION
      </div>
      <div class="step-title">
        Where is it going down?
      </div>
    </div>
    <div class="step-form">
      <div class="field">
        <label>LOCATION</label>
        <input type="text" ref="locationRef" placeholder="e.g. Spain, Times Square or simply your home address" class="loc-search">
      </div>
      <div class="google-map" :id="event_title">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Where",
  data() {
    return {
      locSearch: null,
      location: null,
      address: "",
      lat: null,
      lng: null,
      event_title: "bbq",
      showMap: false
    };
  },
  methods: {
    renderMap() {
      const element = document.getElementById(this.event_title);
      const loc = new google.maps.LatLng(this.lat, this.lng);
      const options = {
        zoom: 15,
        center: loc,
        styles: styles
      };
      const map = new google.maps.Map(element, options);
      const marker = new google.maps.Marker({ position: loc, map });
    }
  },
  watch: {
    lat(value) {
      if (value !== null) {
        this.renderMap();
      }
    }
  },
  mounted() {
    this.locSearch = new google.maps.places.SearchBox(this.$refs.locationRef);
    this.locSearch.addListener("places_changed", () => {
      this.location = this.locSearch.getPlaces();
      this.location.forEach(loc => {
        this.address = loc.formatted_address;
        this.lat = loc.geometry.location.lat();
        this.lng = loc.geometry.location.lng();
      });
    });
  }
};
const styles = [
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#444444"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#f2f2f2"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: -100
      },
      {
        lightness: 45
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#4f595d"
      },
      {
        visibility: "on"
      }
    ]
  }
];
</script>

<style lang="scss">
.location-container {
  margin-top: 64px;
  input {
    background: $cinputbg;
    border: 0;
    padding: 8px;
    width: 100%;
    font-size: 24px;
    border-radius: 2%;
    color: $cheading;
    &:focus {
      outline: none;
      border: 0;
    }
    &::placeholder {
      color: $ctext;
      font-size: 24px;
    }
  }
}
.google-map {
  width: 100%;
  height: 400px;
  background: lighten($cmainbg, 0.1%);
}

.pac-container {
  background: $citembg;
  border: 0;
  color: white;
}
.pac-item {
  color: $ctext;
  border: 0;
  padding: 8px;
  font-size: 14px;
  &:hover {
    background: lighten($citembg, 5%);
  }
}
.pac-item-query {
  color: $cprimaryborder;
}

.pac-icon {
  color: orange;
}
.pac-matched {
  color: lightblue;
}
</style>