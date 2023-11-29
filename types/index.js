// @flow

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {|
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /**
   * [general]
   * Full URL of the resource
   */
  AbsoluteUrl: any,
  /**
   * [general]
   * Either HTML or LocalizedString. Something, that is user value and doesn't need escaping
   */
  EscapedString: any,
  /**
   * [general]
   * Custom HTML, that should be set with _dangerouslySetHTML.
   */
  HTML: any,
  /**
   * [general]
   * JSON object, opaque structure not defined by schema
   */
  JSON: any,
  /**
   * [general]
   * User string, doesn't require translation or modification, can't be used as data type
   */
  LocalizedString: any,
  /**
   * [general]
   * Relative URL of the resource
   */
  RelativeUrl: any,
  /**
   * [general]
   * URL of the resource, can be either Relative or Absolute
   */
  Url: any,
|};


/**
 * [user][BAT]
 * Input used for account activation
 */
export type ActivateAccountInput = {|
  /**
   * [user][BAT]
   * Customer ID from confirmation email
   */
  id?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [user][BAT]
   * Key from confirmation email
   */
  key?: ?$ElementType<Scalars, 'String'>,
|};

export type AddAddressInput = {|
  /**
   * [account]
   * List of user stored addresses
   */
  address?: ?AddressInput,
  /**
   * [account]
   * List of user stored addresses
   */
  default_shipping?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [account]
   * List of user stored addresses
   */
  default_billing?: ?$ElementType<Scalars, 'Boolean'>,
|};

/**
 * [quote]
 * Input is used as an argument for 'AddBundleItemsToCartInput' mutation
 */
export type AddBundleItemsToCartInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Cart items
   */
  cart_items?: ?Array<?CartBundleItemInput>,
  /**
   * [quote]
   * Remove from placement after successful 'Add to Cart'
   */
  remove_from?: ?AddToCartPlacementTypeEnum,
|};

/**
 * [wishlist]
 * Input is used as an argument for 'addBundleItemsToWishlist' mutation
 */
export type AddBundleItemsToWishlistInput = {|
  /**
   * [wishlist]
   * Wishlist items
   */
  items?: ?Array<?WishlistBundleItemInput>,
|};

/**
 * [wishlist]
 * Input is used as an argument for 'addConfigurableItemsToWishlist' mutation
 */
export type AddConfigurableItemsToWishlistInput = {|
  /**
   * [wishlist]
   * Wishlist items
   */
  items?: ?Array<?WishlistConfigurableItemInput>,
|};

/**
 * [quote]
 * Input is used as an argument for 'addCouponToCart' mutation
 */
export type AddCouponToCartInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Coupon code
   */
  code?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [quote][BAT]
 * Input is used as an argument for 'AddCustomerKtpIdToCart' mutation
 */
export type AddCustomerKtpIdToCartInput = {|
  /**
   * [quote][BAT]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote][BAT]
   * Customer KTP ID
   */
  ktp_id?: ?$ElementType<Scalars, 'String'>,
|};

export type AddCustomerNoteToCartInput = {|
  /**
   * [quote][BAT]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote][BAT]
   * Customer Note
   */
  code?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [quote][BAT]
 * Input is used as an argument for 'AddDobToCart' mutation
 */
export type AddDobToCartInput = {|
  /**
   * [quote][BAT]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote][BAT]
   * Customer Day of Birth
   */
  dob?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [free-gift][BAT]
 * Input is used as an argument for adding free gift items to cart
 */
export type AddFreeGiftToCartInput = {|
  /**
   * [free-gift][BAT]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [free-gift][BAT]
   * Referral code
   */
  rule_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [free-gift][BAT]
   * SKU
   */
  sku?: ?$ElementType<Scalars, 'String'>,
  /**
   * [free-gift][BAT]
   * Quantity
   */
  qty?: ?$ElementType<Scalars, 'Int'>,
|};

/**
 * [wishlist]
 * Input is used as an argument for 'addGiftCardItemsToWishlist' mutation
 */
export type AddGiftCardItemToWishlistInput = {|
  /**
   * [wishlist]
   * Wishlist items
   */
  items?: ?Array<?WishlistGiftCardItemInput>,
|};

/**
 * [quote]
 * Input is used as an argument for 'addGiftCardToCart' mutation
 */
export type AddGiftCardToCartInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Gift card code
   */
  code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * PIN code
   */
  pin?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [wishlist]
 * Input is used as an argument for 'addGroupedItemsToWishlist' mutation
 */
export type AddGroupedItemsToWishlistInput = {|
  /**
   * [wishlist]
   * Wishlist items
   */
  items?: ?Array<?WishlistGroupedProductItemInput>,
|};

/**
 * [wishlist]
 * Input is used as an argument for 'addItemsToWishlist' mutation
 */
export type AddItemsToWishlistInput = {|
  /**
   * [wishlist]
   * Wishlist items
   */
  items?: ?Array<?WishlistItemInput>,
|};

/**
 * [quote][BAT]
 * Input is used as an argument for applying referral code to cart
 */
export type AddReferralCodeToCartInput = {|
  /**
   * [quote][BAT]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote][BAT]
   * Referral code
   */
  referral_code?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [review]
 * Input is used as an argument for 'addReview' mutation
 */
export type AddReviewInput = {|
  /**
   * [review]
   * Product ID
   */
  product_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [review]
   * Author of the review
   */
  author?: ?$ElementType<Scalars, 'String'>,
  /**
   * [review]
   * Review title
   */
  title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [review]
   * Review contents
   */
  details?: ?$ElementType<Scalars, 'String'>,
  /**
   * [review]
   * Review ratings
   */
  ratings?: ?Array<?ReviewRatingInput>,
|};

export const AddToCartPlacementTypeEnumValues = Object.freeze({
  WISHLIST: 'WISHLIST'
});


/**
 * [quote]
 * This enumeration defines the 'Add To Cart' placement type.
 */
export type AddToCartPlacementTypeEnum = $Values<typeof AddToCartPlacementTypeEnumValues>;

export type Address = {|
  __typename?: 'Address',
  /**
   * [user]
   * Customer address id
   * Requires authorization.
   */
  address_id?: ?$ElementType<Scalars, 'ID'>,
  city?: ?$ElementType<Scalars, 'String'>,
  company?: ?$ElementType<Scalars, 'String'>,
  country?: ?Country,
  /**
   * [user]
   * Defines if addres is default billing address
   * Requires authorization.
   */
  default_billing?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [user]
   * Defines if addres is default shipping address
   * Requires authorization.
   */
  default_shipping?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [address][BAT]
   * District Address
   */
  district?: ?$ElementType<Scalars, 'String'>,
  firstname?: ?$ElementType<Scalars, 'String'>,
  lastname?: ?$ElementType<Scalars, 'String'>,
  postcode?: ?$ElementType<Scalars, 'String'>,
  region?: ?Region,
  street?: ?Array<?$ElementType<Scalars, 'String'>>,
  telephone?: ?$ElementType<Scalars, 'String'>,
|};

export type AddressInput = {|
  /**
   * [account]
   * City
   */
  city?: ?$ElementType<Scalars, 'String'>,
  /**
   * [account]
   * Company
   */
  company?: ?$ElementType<Scalars, 'String'>,
  /**
   * [account]
   * Two letter abbreviation of country
   */
  country_code?: ?CountryCodeEnum,
  /**
   * [account]
   * First name
   */
  firstname?: ?$ElementType<Scalars, 'String'>,
  /**
   * [account]
   * Last name
   */
  lastname?: ?$ElementType<Scalars, 'String'>,
  /**
   * [account]
   * Postcode
   */
  postcode?: ?$ElementType<Scalars, 'String'>,
  /**
   * [account]
   * Two letter abbreviation of region if applicable otherwise region title
   */
  region?: ?$ElementType<Scalars, 'String'>,
  /**
   * [account]
   * Street
   */
  street?: ?Array<?$ElementType<Scalars, 'String'>>,
  /**
   * [account]
   * Telephone
   */
  telephone?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [quote][BAT]
 * Input is used as an argument for applying reward points to cart
 */
export type ApplyPointsToCartInput = {|
  /**
   * [quote][BAT]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote][BAT]
   * Amount of reward points to be applied
   */
  points?: ?$ElementType<Scalars, 'Int'>,
|};

/**
 * [quote]
 * Input is used as a part for 'SetBillingAddressOnCartInput' input
 */
export type BillingAddressInput = {|
  /**
   * [quote]
   * Billing address
   */
  address?: ?CartAddressInput,
|};

/**
 * [quote]
 * Provides billing address information in shopping cart
 */
export type BillingCartAddress = {|
  __typename?: 'BillingCartAddress',
  /**
   * [quote]
   * Billing address
   */
  address?: ?Address,
  /**
   * [quote]
   * Billing address is the same as shipping address
   */
  same_as_shipping?: ?$ElementType<Scalars, 'Boolean'>,
|};

export type BlogAuthor = {|
  __typename?: 'BlogAuthor',
  /**
   * [blog][BAT]
   * Id of the Blog Post Author
   */
  author_id?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Blog Author Author url
   */
  author_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Author Created
   */
  creation_time?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * FB url
   */
  facebook_page_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * URL key of Blog Author
   */
  identifier?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Instagram url
   */
  instagram_page_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Author Is active
   */
  is_active?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Linkedin url
   */
  linkedin_page_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Author Meta description
   */
  meta_description?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Author Meta title
   */
  meta_title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Author Name
   */
  name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Author role
   */
  role?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Author title
   */
  title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Twitter url
   */
  twitter_page_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Author Url
   */
  url?: ?$ElementType<Scalars, 'String'>,
|};

export type BlogCategory = {|
  __typename?: 'BlogCategory',
  /**
   * [blog][BAT]
   * Blog Category Canonical URL
   */
  canonical_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Id of the Blog Post Category
   */
  category_id?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Category Level
   */
  category_level?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * URL of the Blog Post Category
   */
  category_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Relative URL of the Blog Post Category
   */
  category_url_path?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Category content
   */
  content?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Category Content heading
   */
  content_heading?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Category Display mode
   */
  display_mode?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * URL key of Blog Category
   */
  identifier?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Category Include in menu
   */
  include_in_menu?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Blog Category Is active
   */
  is_active?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Blog Category Meta description
   */
  meta_description?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Category Meta keywords
   */
  meta_keywords?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Category Meta title
   */
  meta_title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Id of the Blog Post Parent Category
   */
  parent_category_id?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Blog Category Path
   */
  path?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Category Position
   */
  position?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Blog Category Posts Count
   */
  posts_count?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Blog Category Posts sort by
   */
  posts_sort_by?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Blog Category title
   */
  title?: ?$ElementType<Scalars, 'String'>,
|};

export type BlogPost = {|
  __typename?: 'BlogPost',
  /**
   * [blog][BAT]
   * Id of the Blog Post
   */
  post_id?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Blog Post URL
   */
  post_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * URL key of Blog Post
   */
  identifier?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post title
   */
  title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Meta title
   */
  meta_title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Meta keywords
   */
  meta_keywords?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Meta description
   */
  meta_description?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Og title
   */
  og_title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Og description
   */
  og_description?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Og image
   */
  og_image?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Og type
   */
  og_type?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Canonical URL
   */
  canonical_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Content heading
   */
  content_heading?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post content
   */
  content?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post filtered content
   */
  filtered_content?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post short filtered content
   */
  short_filtered_content?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Creation time
   */
  creation_time?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Update time
   */
  update_time?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Publish time
   */
  publish_time?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Is active
   */
  is_active?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Blog Post Include in recent
   */
  include_in_recent?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Blog Post Position
   */
  position?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Blog Post first image
   */
  first_image?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Featured image
   */
  featured_image?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Featured image alt attribute
   */
  featured_img_alt?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Author
   */
  author?: ?BlogAuthor,
  /**
   * [blog][BAT]
   * Blog Post Author Id
   */
  author_id?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Blog Post Search Term
   */
  search?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Author Id
   */
  tag_id?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Blog Post Category Id
   */
  category_id?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * An array of related tags
   */
  tags?: ?Array<?BlogTag>,
  /**
   * [blog][BAT]
   * An array of related categories
   */
  categories?: ?Array<?BlogCategory>,
  /**
   * [blog][BAT]
   * Blog Post Page_layout
   */
  page_layout?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Layout update xml
   */
  layout_update_xml?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Custom theme
   */
  custom_theme?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Custom layout
   */
  custom_layout?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Custom layout update xml
   */
  custom_layout_update_xml?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Custom theme from
   */
  custom_theme_from?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Custom theme to
   */
  custom_theme_to?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Media gallery
   */
  media_gallery?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Secret
   */
  secret?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Post Views count
   */
  views_count?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Blog Post Is recent posts skip
   */
  is_recent_posts_skip?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Blog Post Short content
   */
  short_content?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Related posts
   */
  related_posts?: ?Array<?BlogPost>,
  /**
   * [blog][BAT]
   * Blog Related products
   */
  related_products?: ?Array<?$ElementType<Scalars, 'String'>>,
  /**
   * [blog][BAT]
   * Id of the Related Product (This attribute used only in filter)
   */
  relatedproduct_id?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * If social sharing is enabled
   */
  enable_social_sharing?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [blog][BAT]
   * Meta Robots tags
   */
  meta_robots?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [blog][BAT]
 * Input is used to send data of post filter input
 */
export type BlogPostsFilterInput = {|
  /**
   * [blog][BAT]
   * Post ID
   */
  post_id?: ?FilterTypeInput,
  /**
   * [blog][BAT]
   * Author ID
   */
  author_id?: ?FilterTypeInput,
  /**
   * [blog][BAT]
   * Tag ID
   */
  tag_id?: ?FilterTypeInput,
  /**
   * [blog][BAT]
   * Category ID
   */
  category_id?: ?FilterTypeInput,
  /**
   * [blog][BAT]
   * Post's title
   */
  title?: ?FilterTypeInput,
  /**
   * [blog][BAT]
   * Post's content
   */
  content?: ?FilterTypeInput,
  /**
   * [blog][BAT]
   * Publish time
   */
  publish_time?: ?FilterTypeInput,
  /**
   * [blog][BAT]
   * Search
   */
  search?: ?FilterTypeInput,
  /**
   * [blog][BAT]
   * An ID of a related product
   */
  relatedproduct_id?: ?FilterTypeInput,
  /**
   * [blog][BAT]
   * The keyword required to perform a logical OR comparison
   */
  or?: ?BlogPostsFilterInput,
|};

export type BlogPostsOutput = {|
  __typename?: 'BlogPostsOutput',
  /**
   * [blog][BAT]
   * Total count of posts
   */
  total_count?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Total count of pages
   */
  total_pages?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * An array of Blog posts
   */
  items?: ?Array<?BlogPost>,
|};

export type BlogTag = {|
  __typename?: 'BlogTag',
  /**
   * [blog][BAT]
   * Blog Tag content
   */
  content?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Tag Custom layout
   */
  custom_layout?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Tag Custom layout update xml
   */
  custom_layout_update_xml?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Tag Custom theme
   */
  custom_theme?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Tag Custom theme from
   */
  custom_theme_from?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Tag Custom theme to
   */
  custom_theme_to?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * URL key of Blog Tag
   */
  identifier?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Tag Is active
   */
  is_active?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Blog Tag Layout update xml
   */
  layout_update_xml?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Tag Meta description
   */
  meta_description?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Tag Meta keywords
   */
  meta_keywords?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Tag Meta robots
   */
  meta_robots?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Tag Meta title
   */
  meta_title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Tag Page_layout
   */
  page_layout?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Id of the Blog Post Tag
   */
  tag_id?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * URL of Blog Tag
   */
  tag_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Blog Tag title
   */
  title?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [quote]
 * Input is used as a part for 'updateBundleCartItemsInput' input
 */
export type BundleCartItemUpdateInput = {|
  /**
   * [quote]
   * Cart item ID
   */
  cart_item_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Bundle options
   */
  bundle_options?: ?Array<?BundleOptionInput>,
  /**
   * [quote]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
|};

/**
 * [product]
 * Selected bundle product options and total sum.
 * Used by other packages where we need to display selected options.
 */
export type BundleInfo = {|
  __typename?: 'BundleInfo',
  /**
   * [product]
   * Total sum of bundle product based on selected options
   */
  total_sum?: ?Money,
  /**
   * [product]
   * Options that user selected
   */
  selected_options?: ?Array<?SelectedBundleOption>,
|};

export const BundleInputTypeValues = Object.freeze({
  /**
   * [product]
   * Displayed as a drop-down with an ability to select only one product
   */
  DROPDOWN: 'DROPDOWN',
  /**
   * [product]
   * Displayed as radio buttons with an ability to select only one product
   */
  RADIO: 'RADIO',
  /**
   * [product]
   * Displayed as checkboxes with an ability to select several product
   */
  CHECKBOX: 'CHECKBOX',
  /**
   * [product]
   * Displayed as multiple select with an ability to select several product
   */
  MULTISELECT: 'MULTISELECT'
});


/**
 * [product]
 * Input type of a bundle option
 */
export type BundleInputType = $Values<typeof BundleInputTypeValues>;

/**
 * [product]
 * Product that is part of a bundle
 */
export type BundleOption = {|
  __typename?: 'BundleOption',
  /**
   * [product]
   * Id of the option
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product]
   * Products of this option
   */
  products?: ?Array<?BundledProduct>,
  /**
   * [product]
   * Determine how the option will be displayed
   */
  input_type?: ?BundleInputType,
  /**
   * [product]
   * If user have to select something
   */
  required?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [product]
   * Display name of the option
   */
  label?: ?$ElementType<Scalars, 'LocalizedString'>,
|};

/**
 * [product]
 * Input is used as a bundle_sum input
 */
export type BundleOptionInput = {|
  /**
   * [product]
   * Option ID
   */
  id: $ElementType<Scalars, 'ID'>,
  /**
   * [product]
   * Option value ID
   */
  value: Array<$ElementType<Scalars, 'ID'>>,
  /**
   * [product]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
|};

/**
 * [product]
 * Product that is part of a bundle
 */
export type BundledProduct = {|
  __typename?: 'BundledProduct',
  /**
   * [product]
   * Option value ID
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product]
   * Product, that is matched to variation_attributes array
   */
  product?: ?Product,
  /**
   * [product]
   * It the product is a Variation, this field contains array of variation values
   */
  variation_values?: ?Array<?VariationValue>,
  /**
   * [product]
   * Preselected quantity
   */
  qty?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [product]
   * Define if a user can change preselected quantity on pdp
   */
  qty_is_editable?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [product]
   * If the product is preselected in an option
   */
  is_default?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [product]
   * Price that is added to the bundle total sum if this bundled product is selected
   */
  price?: ?Money,
|};

/**
 * [general]
 * Cart contains items, prices, shipping information, payment information, etc.
 */
export type Cart = {|
  __typename?: 'Cart',
  /**
   * [quote]
   * Selected billing address
   */
  billing_address?: ?BillingCartAddress,
  /**
   * [quote]
   * Applied coupon codes
   */
  coupons?: ?Array<?CartCoupon>,
  /**
   * [quote][BAT]
   * Customer KTP IDs
   */
  customer_ktp_id?: ?Array<?KtpId>,
  /**
   * [quote][BAT]
   * Customer Notes
   */
  customer_note?: ?Array<?CustomerNote>,
  /**
   * [quote][BAT]
   * User's day of birth
   */
  dob?: ?Dob,
  /**
   * [quote][BAT]
   * Earn points
   */
  earn_points?: ?Array<?EarnPoints>,
  /**
   * [quote]
   * User email
   */
  email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote][BAT]
   * Information about cart errors
   */
  error_info?: ?CartErrorInfo,
  /**
   * [quote][BAT]
   * Error message text if something went wrong
   */
  error_message?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Applied gift cards
   */
  gift_cards?: ?Array<?GiftCard>,
  /**
   * [general]
   * Cart Id
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Is only virtual products in cart
   */
  is_virtual?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [quote]
   * Items in cart
   */
  items?: ?Array<?CartItem>,
  /**
   * [quote]
   * List of all available payment methods
   */
  payment_methods?: ?Array<?PaymentMethod>,
  /**
   * [quote]
   * Subtotal, taxes, discounts, etc
   */
  prices?: ?CartPrices,
  /**
   * [quote][BAT]
   * Referral code
   */
  referral_code?: ?ReferralCode,
  /**
   * [quote][BAT]
   * Reward points discount amount
   */
  reward_discount?: ?RewardDiscount,
  /**
   * [quote]
   * Selected payment method
   */
  selected_payment_method?: ?SelectedPaymentMethod,
  /**
   * [quote]
   * List of selected shipping addresses. May contain more than one item only in case of multishipping
   */
  shipping_addresses?: ?Array<?ShippingCartAddress>,
  /**
   * [quote][BAT]
   * Spend points
   */
  spend_points?: ?Array<?SpendPoints>,
  /**
   * [quote]
   * Total count items in cart
   */
  total_items?: ?$ElementType<Scalars, 'Int'>,
|};

/**
 * [quote]
 * Input is used as a part for 'ShippingAddressInput' input
 */
export type CartAddressInput = {|
  /**
   * [quote]
   * City
   */
  city?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Company
   */
  company?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Two letter abbreviation of country
   */
  country_code?: ?CountryCodeEnum,
  /**
   * [quote]
   * First name
   */
  firstname?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Last name
   */
  lastname?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Postcode
   */
  postcode?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Two letter abbreviation of region if applicable otherwise region title
   */
  region?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Street
   */
  street?: ?Array<?$ElementType<Scalars, 'String'>>,
  /**
   * [quote]
   * Telephone
   */
  telephone?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [quote]
 * Input is used as a part for 'AddBundleItemsToCartInput' input
 */
export type CartBundleItemInput = {|
  /**
   * [quote]
   * Product ID
   */
  product_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Bundle options
   */
  bundle_options?: ?Array<?BundleOptionInput>,
  /**
   * [quote]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
|};

/**
 * [quote]
 * Input is used as a part for 'addConfigurableItemsToCartInput' input
 */
export type CartConfigurableItemInput = {|
  /**
   * [quote]
   * Product ID
   */
  product_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Variant product ID
   */
  variant_product_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
|};

/**
 * [quote]
 * Provides coupon information
 */
export type CartCoupon = {|
  __typename?: 'CartCoupon',
  /**
   * [quote]
   * Coupon code
   */
  code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Coupon label
   */
  label?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Applied discount to the current shopping cart
   */
  applied_discount?: ?Money,
  /**
   * [quote]
   * Applied discount to the current shopping cart in percent
   */
  percent?: ?$ElementType<Scalars, 'Float'>,
|};

/**
 * [quote][BAT]
 * Cart error information
 */
export type CartErrorInfo = {|
  __typename?: 'CartErrorInfo',
  /**
   * [quote][BAT]
   * Flag indicates that an error was sent by server, will be sent as true if an order can't be placed
   */
  has_error?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [quote][BAT]
   * An array with error messages
   */
  errors?: ?Array<?$ElementType<Scalars, 'String'>>,
|};

/**
 * [quote]
 * Input is used as a part for 'addGiftCardItemsToCartInput' input
 */
export type CartGiftCardItemInput = {|
  /**
   * [quote]
   * Product ID
   */
  product_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [quote]
   * Amount of gift card
   */
  amount?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [quote]
   * Recipient name
   */
  recipient_name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [quote]
   * Recipient email
   */
  recipient_email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Senders name
   */
  senders_name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [quote]
   * Senders email
   */
  senders_email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * The gift card message, filled in by sender
   */
  message?: ?$ElementType<Scalars, 'EscapedString'>,
|};

/**
 * [quote]
 * Provides cart items information
 */
export type CartItem = {|
  __typename?: 'CartItem',
  /**
   * [quote]
   * Timestamp indicating when the product was added to cart
   */
  added_at?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Bundle product options and total sum
   */
  bundle_info?: ?BundleInfo,
  /**
   * [quote]
   * Cart item Id
   */
  cart_item_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Configurable product variation
   */
  configurable_variation?: ?Variation,
  /**
   * [quote][BAT]
   * Engraved product options
   */
  engraved_options?: ?EngravedOptionsInfo,
  /**
   * [quote]
   * Gift card information
   */
  gift_card?: ?GiftCardItem,
  /**
   * [free-gift][BAT]
   * Free gift items price label
   */
  price_label?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Cart item product
   */
  product?: ?Product,
  /**
   * [quote][BAT]
   * Product type
   */
  product_type?: ?ProductType,
  /**
   * [quote]
   * Quantity of cart item product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
|};

/**
 * [quote]
 * Input is used as a part for 'addItemsToCartInput' input
 */
export type CartItemInput = {|
  /**
   * [quote][BAT]
   * Engraved Options
   */
  engraved_options?: ?EngravedOptionsInput,
  /**
   * [quote]
   * Grouped Product ID: identify to which grouped product belongs to
   */
  grouped_product_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Product ID
   */
  product_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
|};

/**
 * [quote]
 * Input is used as a part for 'updateCartItemsInput' input
 */
export type CartItemUpdateInput = {|
  /**
   * [quote]
   * Cart item ID
   */
  cart_item_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote][BAT]
   * Engraved product options
   */
  engraved_options?: ?EngravedOptionsInput,
  /**
   * [quote]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
|};

/**
 * [quote]
 * Provides cart prices information: subtotal, taxes, discounts, etc
 */
export type CartPrices = {|
  __typename?: 'CartPrices',
  /**
   * [quote]
   * Subtotal of cart: sum of the prices of all products
   */
  subtotal?: ?Money,
  /**
   * [quote]
   * Applied taxes
   */
  taxes?: ?Array<?TaxItem>,
  /**
   * [quote]
   * Applied promotions/cart price rules
   */
  promotions?: ?Array<?CartPromotion>,
  /**
   * [quote]
   * The final calculated price of your order, which includes the sum of product prices, delivery, taxes, applied discounts and gift cards
   */
  grand_total?: ?Money,
|};

/**
 * [quote]
 * Provides cart promotion / summarized price rules information
 */
export type CartPromotion = {|
  __typename?: 'CartPromotion',
  /**
   * [quote]
   * Promotion label / Labels of applied cart price rules
   */
  label?: ?Array<?$ElementType<Scalars, 'String'>>,
  /**
   * [quote]
   * Promotion / summarized price rules amount
   */
  amount?: ?Money,
  /**
   * [quote]
   * Applied promotion in percent
   */
  percent?: ?$ElementType<Scalars, 'Float'>,
|};

/**
 * [widget]
 * Data loaded for CatalogProductListWidget
 */
export type CatalogProductList = {|
  __typename?: 'CatalogProductList',
  /**
   * [widget]
   * CatalogProductList widget id. Used to associate specific instance with it's data
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [widget]
   * Title is displayed above product list.
   */
  title?: ?$ElementType<Scalars, 'EscapedString'>,
  /**
   * [widget]
   * Products, that should be displayed as widget content
   */
  products?: ?Array<?Product>,
|};

/**
 * [general]
 * Category contains the full set of attributes that can be returned in a category search
 */
export type Category = {|
  __typename?: 'Category',
  /**
   * [catalog]
   * The canonical category URL
   */
  canonical_url?: ?$ElementType<Scalars, 'AbsoluteUrl'>,
  /**
   * [catalog]
   * Array of subcategories. Can be empty.
   */
  children?: ?Array<?Category>,
  /**
   * [catalog]
   * Timestamp indicating when the category was created
   */
  created_at?: ?$ElementType<Scalars, 'String'>,
  /**
   * [catalog]
   * An optional description of the category, used on category page
   */
  description?: ?$ElementType<Scalars, 'EscapedString'>,
  /**
   * [general]
   * The ID number assigned to the Category. ID for the root category is "root"
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [catalog]
   * The path to the main image of the category, used on category page
   */
  image?: ?Image,
  /**
   * [catalog]
   * A brief overview of the category for search results listings, maximum 255 characters
   */
  meta_description?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [catalog]
   * A comma-separated list of keywords that are visible only to search engines
   */
  meta_keywords?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [catalog][BAT]
   * Meta Robots tags
   */
  meta_robots?: ?$ElementType<Scalars, 'String'>,
  /**
   * [catalog]
   * A string that is displayed in the title bar and tab of the browser and in search results lists
   */
  meta_title?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [catalog]
   * The display name of the category, used in category navigation
   */
  name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [catalog]
   * Parent category. When category is "root" - parent property is null
   */
  parent?: ?Category,
  /**
   * [catalog]
   * The list of products assigned to the category
   */
  products?: ?ProductSearch,
  /**
   * [catalog]
   * The relative path to the category's thumbnail image, can be used as category preview
   */
  thumbnail?: ?Image,
  /**
   * [catalog]
   * Timestamp indicating when the category was updated
   */
  updated_at?: ?$ElementType<Scalars, 'String'>,
  /**
   * [catalog]
   * The category url, used to set in browser lcoation
   */
  url?: ?$ElementType<Scalars, 'RelativeUrl'>,
  /**
   * [catalog]
   * Defines url, that this category should resolve to
   */
  url_rewrite?: ?EntityUrl,
|};


/**
 * [general]
 * Category contains the full set of attributes that can be returned in a category search
 */
export type CategoryProductsArgs = {|
  search: $ElementType<Scalars, 'String'>,
  start: $ElementType<Scalars, 'Int'>,
  count: $ElementType<Scalars, 'Int'>,
  filters?: ?Array<?FilterInput>,
  sort?: ?SortInput,
|};

/**
 * [catalog]
 * The Category search object is the top-level object returned in a category search
 */
export type CategorySearch = {|
  __typename?: 'CategorySearch',
  /**
   * [catalog]
   * Offset of returned data for particular category search
   */
  start?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [catalog]
   * The number of categories returned
   */
  count?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [catalog]
   * An array of categories that match the specified search criteria
   */
  items?: ?Array<?Category>,
|};

/** The CategorySubscription interface of the category subscription. */
export type CategorySubscriptionInput = {|
  /** Push subscription */
  push_subscription: PushSubscriptionInput,
  /** Category code */
  category_code: $ElementType<Scalars, 'ID'>,
|};

export type CcAvenueRedirect = {|
  __typename?: 'CcAvenueRedirect',
  /**
   * [ccavenue][BAT]
   * Action - url to send data
   */
  action?: ?$ElementType<Scalars, 'String'>,
  /**
   * [ccavenue][BAT]
   * List of fields
   */
  fields?: ?Array<?CcAvenueRedirectField>,
|};

export type CcAvenueRedirectField = {|
  __typename?: 'CcAvenueRedirectField',
  /**
   * [ccavenue][BAT]
   * Field's name
   */
  name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [ccavenue][BAT]
   * Field's value
   */
  value?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [ccavenue][BAT]
 * Input is used as an argument for 'ccavenueRedirect' mutation
 */
export type CcAvenueRedirectInput = {|
  /**
   * [ccavenue][BAT]
   * Cart identifier
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
|};

/**
 * [checkout-com][BAT]
 * Configuration for Checkout.com iframe
 */
export type CheckoutComConfig = {|
  __typename?: 'CheckoutComConfig',
  /**
   * [checkout-com][BAT]
   * Public key
   */
  public_key?: ?$ElementType<Scalars, 'String'>,
  /**
   * [checkout-com][BAT]
   * Flag that responsible for enabling view console messages
   */
  debug?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [checkout-com][BAT]
   * String, allows to use one of the supported languages
   */
  localization?: ?$ElementType<Scalars, 'String'>,
  /**
   * [checkout-com][BAT]
   * String with styles to customize the look and feel of Frames' controlled fields
   */
  style?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [checkout]
 * Provides checkout order information
 */
export type CheckoutOrder = {|
  __typename?: 'CheckoutOrder',
  /**
   * [checkout]
   * Order information
   */
  order?: ?Order,
  /**
   * [checkout-com][BAT]
   * URL to redirect to 3DS2
   */
  redirect_url?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [checkout-com][BAT]
 * Input is used as an argument for 'checkoutcomPlaceOrder' mutation
 */
export type CheckoutcomPlaceOrderInput = {|
  /**
   * [checkout-com][BAT]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [checkout-com][BAT]
   * Payment method code
   */
  method_id?: ?$ElementType<Scalars, 'String'>,
  /**
   * [checkout-com][BAT]
   * Card token
   */
  card_token?: ?$ElementType<Scalars, 'String'>,
  /**
   * [checkout-com][BAT]
   * Card bin
   */
  card_bin?: ?$ElementType<Scalars, 'String'>,
  /**
   * [checkout-com][BAT]
   * Flag that responsible if payment card should be saved
   */
  save_card?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [checkout-com][BAT]
   * Additional string with payment method code
   */
  source?: ?$ElementType<Scalars, 'String'>,
|};

export type City = {|
  __typename?: 'City',
  /**
   * [common][BAT]
   * City ID
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [common][BAT]
   * City Code
   */
  code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common][BAT]
   * List of Districts
   */
  districts?: ?Array<?District>,
  /**
   * [common][BAT]
   * City Name
   */
  name?: ?$ElementType<Scalars, 'String'>,
|};

export type CityDistributor = {|
  __typename?: 'CityDistributor',
  /**
   * [common][BAT]
   * Courier email
   */
  email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common][BAT]
   * City of courier email
   */
  city?: ?$ElementType<Scalars, 'String'>,
|};

export type ClientPurchase = {|
  __typename?: 'ClientPurchase',
  /**
   * [quote][BAT]
   * Checkout action field
   */
  actionField?: ?ClientPurchaseActionField,
  /**
   * [quote][BAT]
   * Cart items
   */
  products?: ?Array<?CartItem>,
  /**
   * [quote][BAT]
   * Order information
   */
  order?: ?Order,
|};

export type ClientPurchaseActionField = {|
  __typename?: 'ClientPurchaseActionField',
  /**
   * [quote][BAT]
   * Cart items
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote][BAT]
   * Affiliation
   */
  affiliation?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote][BAT]
   * Grand total
   */
  revenue?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [quote][BAT]
   * Shipping method amount value
   */
  shipping?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [quote][BAT]
   * Coupon label
   */
  coupon?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote][BAT]
   * Referral Code
   */
  referral_code?: ?ReferralCode,
  /**
   * [quote][BAT]
   * Payment method name
   */
  payment_method?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote][BAT]
   * Applied taxes
   */
  taxes?: ?Array<?TaxItem>,
|};

/**
 * [cms]
 * CMS block contains HTML provided by Content Managment System and is being rendered by LUFT in predefined
 * places of the components identified by ids
 */
export type CmsBlock = {|
  __typename?: 'CmsBlock',
  /**
   * [cms]
   * Cms Block id and CmsBlockContainer identifier, used for HTML content positioning in other components
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [cms]
   * HTML content, that will be renderd for the cms page
   */
  content?: ?$ElementType<Scalars, 'HTML'>,
|};

/**
 * [cms]
 * CMS page contains HTML, provided by Content Managment System and is being rendered by LUFT for specific URL
 */
export type CmsPage = {|
  __typename?: 'CmsPage',
  /**
   * [cms]
   * The canonical CMS URL
   */
  canonical_url?: ?$ElementType<Scalars, 'AbsoluteUrl'>,
  /**
   * [cms]
   * HTML content, that will be renderd for the cms page
   */
  content?: ?$ElementType<Scalars, 'HTML'>,
  /**
   * [cms]
   * Cms Page id
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [cms]
   * A brief overview of the Cms Page for search results listings, maximum 255 characters
   */
  meta_description?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [cms]
   * A comma-separated list of keywords that are visible only to search engines
   */
  meta_keywords?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [cms][BAT]
   * Meta Robots tags
   */
  meta_robots?: ?$ElementType<Scalars, 'String'>,
  /**
   * [cms]
   * A string that is displayed in the title bar and tab of the browser and in search results lists
   */
  meta_title?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [cms]
   * title is displayed as heading on top of  of the page
   */
  title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [cms]
   * Cms page Url, used for navigation
   */
  url?: ?$ElementType<Scalars, 'RelativeUrl'>,
  /**
   * [cms]
   * Defines url, that this cms page should resolve to
   */
  url_rewrite?: ?EntityUrl,
|};

/**
 * [quote]
 * Input is used as a part for 'updateConfigurableCartItemsInput' input
 */
export type ConfigurableCartItemUpdateInput = {|
  /**
   * [quote]
   * Cart item ID
   */
  cart_item_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Variant product ID
   */
  variant_product_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
|};

export type ConfirmationLink = {|
  __typename?: 'ConfirmationLink',
  /**
   * [user][BAT]
   * Flag, which identifies that confirmation was successfully sent to the user email
   */
  success?: ?$ElementType<Scalars, 'Boolean'>,
|};

/**
 * [contact-us][BAT]
 * Input is used to send Contact Us form data to CRM
 */
export type ContactUsFormInput = {|
  /**
   * [contact-us][BAT]
   * Full Name
   */
  full_name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [contact-us][BAT]
   * Email Address
   */
  email_address?: ?$ElementType<Scalars, 'String'>,
  /**
   * [contact-us][BAT]
   * Phone
   */
  phone?: ?$ElementType<Scalars, 'String'>,
  /**
   * [contact-us][BAT]
   * Message
   */
  message?: ?$ElementType<Scalars, 'String'>,
  /**
   * [contact-us][BAT]
   * Captcha Token
   */
  g_recaptcha_response?: ?$ElementType<Scalars, 'String'>,
|};

export type ContactUsFormOutput = {|
  __typename?: 'ContactUsFormOutput',
  /**
   * [contact-us][BAT]
   * Response after success sending Contact Us form data to CRM
   */
  success?: ?$ElementType<Scalars, 'Boolean'>,
|};

export type Country = {|
  __typename?: 'Country',
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [general]
   * Full name of country
   */
  name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [general]
   * List of regions
   */
  regions?: ?Array<?Region>,
  /**
   * [general]
   * Two letter abbreviation of country
   */
  code?: ?CountryCodeEnum,
|};

export const CountryCodeEnumValues = Object.freeze({
  /**
   * [general]
   * Afghanistan
   */
  AF: 'AF',
  /**
   * [general]
   * Åland Islands
   */
  AX: 'AX',
  /**
   * [general]
   * Albania
   */
  AL: 'AL',
  /**
   * [general]
   * Algeria
   */
  DZ: 'DZ',
  /**
   * [general]
   * American Samoa
   */
  AS: 'AS',
  /**
   * [general]
   * Andorra
   */
  AD: 'AD',
  /**
   * [general]
   * Angola
   */
  AO: 'AO',
  /**
   * [general]
   * Anguilla
   */
  AI: 'AI',
  /**
   * [general]
   * Antarctica
   */
  AQ: 'AQ',
  /**
   * [general]
   * Antigua & Barbuda
   */
  AG: 'AG',
  /**
   * [general]
   * Argentina
   */
  AR: 'AR',
  /**
   * [general]
   * Armenia
   */
  AM: 'AM',
  /**
   * [general]
   * Aruba
   */
  AW: 'AW',
  /**
   * [general]
   * Australia
   */
  AU: 'AU',
  /**
   * [general]
   * Austria
   */
  AT: 'AT',
  /**
   * [general]
   * Azerbaijan
   */
  AZ: 'AZ',
  /**
   * [general]
   * Bahamas
   */
  BS: 'BS',
  /**
   * [general]
   * Bahrain
   */
  BH: 'BH',
  /**
   * [general]
   * Bangladesh
   */
  BD: 'BD',
  /**
   * [general]
   * Barbados
   */
  BB: 'BB',
  /**
   * [general]
   * Belarus
   */
  BY: 'BY',
  /**
   * [general]
   * Belgium
   */
  BE: 'BE',
  /**
   * [general]
   * Belize
   */
  BZ: 'BZ',
  /**
   * [general]
   * Benin
   */
  BJ: 'BJ',
  /**
   * [general]
   * Bermuda
   */
  BM: 'BM',
  /**
   * [general]
   * Bhutan
   */
  BT: 'BT',
  /**
   * [general]
   * Bolivia
   */
  BO: 'BO',
  /**
   * [general]
   * Bosnia & Herzegovina
   */
  BA: 'BA',
  /**
   * [general]
   * Botswana
   */
  BW: 'BW',
  /**
   * [general]
   * Bouvet Island
   */
  BV: 'BV',
  /**
   * [general]
   * Brazil
   */
  BR: 'BR',
  /**
   * [general]
   * British Indian Ocean Territory
   */
  IO: 'IO',
  /**
   * [general]
   * British Virgin Islands
   */
  VG: 'VG',
  /**
   * [general]
   * Brunei
   */
  BN: 'BN',
  /**
   * [general]
   * Bulgaria
   */
  BG: 'BG',
  /**
   * [general]
   * Burkina Faso
   */
  BF: 'BF',
  /**
   * [general]
   * Burundi
   */
  BI: 'BI',
  /**
   * [general]
   * Cambodia
   */
  KH: 'KH',
  /**
   * [general]
   * Cameroon
   */
  CM: 'CM',
  /**
   * [general]
   * Canada
   */
  CA: 'CA',
  /**
   * [general]
   * Cape Verde
   */
  CV: 'CV',
  /**
   * [general]
   * Cayman Islands
   */
  KY: 'KY',
  /**
   * [general]
   * Central African Republic
   */
  CF: 'CF',
  /**
   * [general]
   * Chad
   */
  TD: 'TD',
  /**
   * [general]
   * Chile
   */
  CL: 'CL',
  /**
   * [general]
   * China
   */
  CN: 'CN',
  /**
   * [general]
   * Christmas Island
   */
  CX: 'CX',
  /**
   * [general]
   * Cocos (Keeling) Islands
   */
  CC: 'CC',
  /**
   * [general]
   * Colombia
   */
  CO: 'CO',
  /**
   * [general]
   * Comoros
   */
  KM: 'KM',
  /**
   * [general]
   * Congo-Brazzaville
   */
  CG: 'CG',
  /**
   * [general]
   * Congo-Kinshasa
   */
  CD: 'CD',
  /**
   * [general]
   * Cook Islands
   */
  CK: 'CK',
  /**
   * [general]
   * Costa Rica
   */
  CR: 'CR',
  /**
   * [general]
   * Côte d’Ivoire
   */
  CI: 'CI',
  /**
   * [general]
   * Croatia
   */
  HR: 'HR',
  /**
   * [general]
   * Cuba
   */
  CU: 'CU',
  /**
   * [general]
   * Cyprus
   */
  CY: 'CY',
  /**
   * [general]
   * Czech Republic
   */
  CZ: 'CZ',
  /**
   * [general]
   * Denmark
   */
  DK: 'DK',
  /**
   * [general]
   * Djibouti
   */
  DJ: 'DJ',
  /**
   * [general]
   * Dominica
   */
  DM: 'DM',
  /**
   * [general]
   * Dominican Republic
   */
  DO: 'DO',
  /**
   * [general]
   * Ecuador
   */
  EC: 'EC',
  /**
   * [general]
   * Egypt
   */
  EG: 'EG',
  /**
   * [general]
   * El Salvador
   */
  SV: 'SV',
  /**
   * [general]
   * Equatorial Guinea
   */
  GQ: 'GQ',
  /**
   * [general]
   * Eritrea
   */
  ER: 'ER',
  /**
   * [general]
   * Estonia
   */
  EE: 'EE',
  /**
   * [general]
   * Ethiopia
   */
  ET: 'ET',
  /**
   * [general]
   * Falkland Islands
   */
  FK: 'FK',
  /**
   * [general]
   * Faroe Islands
   */
  FO: 'FO',
  /**
   * [general]
   * Fiji
   */
  FJ: 'FJ',
  /**
   * [general]
   * Finland
   */
  FI: 'FI',
  /**
   * [general]
   * France
   */
  FR: 'FR',
  /**
   * [general]
   * French Guiana
   */
  GF: 'GF',
  /**
   * [general]
   * French Polynesia
   */
  PF: 'PF',
  /**
   * [general]
   * French Southern Territories
   */
  TF: 'TF',
  /**
   * [general]
   * Gabon
   */
  GA: 'GA',
  /**
   * [general]
   * Gambia
   */
  GM: 'GM',
  /**
   * [general]
   * Georgia
   */
  GE: 'GE',
  /**
   * [general]
   * Germany
   */
  DE: 'DE',
  /**
   * [general]
   * Ghana
   */
  GH: 'GH',
  /**
   * [general]
   * Gibraltar
   */
  GI: 'GI',
  /**
   * [general]
   * Greece
   */
  GR: 'GR',
  /**
   * [general]
   * Greenland
   */
  GL: 'GL',
  /**
   * [general]
   * Grenada
   */
  GD: 'GD',
  /**
   * [general]
   * Guadeloupe
   */
  GP: 'GP',
  /**
   * [general]
   * Guam
   */
  GU: 'GU',
  /**
   * [general]
   * Guatemala
   */
  GT: 'GT',
  /**
   * [general]
   * Guernsey
   */
  GG: 'GG',
  /**
   * [general]
   * Guinea
   */
  GN: 'GN',
  /**
   * [general]
   * Guinea-Bissau
   */
  GW: 'GW',
  /**
   * [general]
   * Guyana
   */
  GY: 'GY',
  /**
   * [general]
   * Haiti
   */
  HT: 'HT',
  /**
   * [general]
   * Heard &amp; McDonald Islands
   */
  HM: 'HM',
  /**
   * [general]
   * Honduras
   */
  HN: 'HN',
  /**
   * [general]
   * Hong Kong SAR China
   */
  HK: 'HK',
  /**
   * [general]
   * Hungary
   */
  HU: 'HU',
  /**
   * [general]
   * Iceland
   */
  IS: 'IS',
  /**
   * [general]
   * India
   */
  IN: 'IN',
  /**
   * [general]
   * Indonesia
   */
  ID: 'ID',
  /**
   * [general]
   * Iran
   */
  IR: 'IR',
  /**
   * [general]
   * Iraq
   */
  IQ: 'IQ',
  /**
   * [general]
   * Ireland
   */
  IE: 'IE',
  /**
   * [general]
   * Isle of Man
   */
  IM: 'IM',
  /**
   * [general]
   * Israel
   */
  IL: 'IL',
  /**
   * [general]
   * Italy
   */
  IT: 'IT',
  /**
   * [general]
   * Jamaica
   */
  JM: 'JM',
  /**
   * [general]
   * Japan
   */
  JP: 'JP',
  /**
   * [general]
   * Jersey
   */
  JE: 'JE',
  /**
   * [general]
   * Jordan
   */
  JO: 'JO',
  /**
   * [general]
   * Kazakhstan
   */
  KZ: 'KZ',
  /**
   * [general]
   * Kenya
   */
  KE: 'KE',
  /**
   * [general]
   * Kiribati
   */
  KI: 'KI',
  /**
   * [general]
   * Kuwait
   */
  KW: 'KW',
  /**
   * [general]
   * Kyrgyzstan
   */
  KG: 'KG',
  /**
   * [general]
   * Laos
   */
  LA: 'LA',
  /**
   * [general]
   * Latvia
   */
  LV: 'LV',
  /**
   * [general]
   * Lebanon
   */
  LB: 'LB',
  /**
   * [general]
   * Lesotho
   */
  LS: 'LS',
  /**
   * [general]
   * Liberia
   */
  LR: 'LR',
  /**
   * [general]
   * Libya
   */
  LY: 'LY',
  /**
   * [general]
   * Liechtenstein
   */
  LI: 'LI',
  /**
   * [general]
   * Lithuania
   */
  LT: 'LT',
  /**
   * [general]
   * Luxembourg
   */
  LU: 'LU',
  /**
   * [general]
   * Macau SAR China
   */
  MO: 'MO',
  /**
   * [general]
   * Macedonia
   */
  MK: 'MK',
  /**
   * [general]
   * Madagascar
   */
  MG: 'MG',
  /**
   * [general]
   * Malawi
   */
  MW: 'MW',
  /**
   * [general]
   * Malaysia
   */
  MY: 'MY',
  /**
   * [general]
   * Maldives
   */
  MV: 'MV',
  /**
   * [general]
   * Mali
   */
  ML: 'ML',
  /**
   * [general]
   * Malta
   */
  MT: 'MT',
  /**
   * [general]
   * Marshall Islands
   */
  MH: 'MH',
  /**
   * [general]
   * Martinique
   */
  MQ: 'MQ',
  /**
   * [general]
   * Mauritania
   */
  MR: 'MR',
  /**
   * [general]
   * Mauritius
   */
  MU: 'MU',
  /**
   * [general]
   * Mayotte
   */
  YT: 'YT',
  /**
   * [general]
   * Mexico
   */
  MX: 'MX',
  /**
   * [general]
   * Micronesia
   */
  FM: 'FM',
  /**
   * [general]
   * Moldova
   */
  MD: 'MD',
  /**
   * [general]
   * Monaco
   */
  MC: 'MC',
  /**
   * [general]
   * Mongolia
   */
  MN: 'MN',
  /**
   * [general]
   * Montenegro
   */
  ME: 'ME',
  /**
   * [general]
   * Montserrat
   */
  MS: 'MS',
  /**
   * [general]
   * Morocco
   */
  MA: 'MA',
  /**
   * [general]
   * Mozambique
   */
  MZ: 'MZ',
  /**
   * [general]
   * Myanmar (Burma)
   */
  MM: 'MM',
  /**
   * [general]
   * Namibia
   */
  NA: 'NA',
  /**
   * [general]
   * Nauru
   */
  NR: 'NR',
  /**
   * [general]
   * Nepal
   */
  NP: 'NP',
  /**
   * [general]
   * Netherlands
   */
  NL: 'NL',
  /**
   * [general]
   * Netherlands Antilles
   */
  AN: 'AN',
  /**
   * [general]
   * New Caledonia
   */
  NC: 'NC',
  /**
   * [general]
   * New Zealand
   */
  NZ: 'NZ',
  /**
   * [general]
   * Nicaragua
   */
  NI: 'NI',
  /**
   * [general]
   * Niger
   */
  NE: 'NE',
  /**
   * [general]
   * Nigeria
   */
  NG: 'NG',
  /**
   * [general]
   * Niue
   */
  NU: 'NU',
  /**
   * [general]
   * Norfolk Island
   */
  NF: 'NF',
  /**
   * [general]
   * Northern Mariana Islands
   */
  MP: 'MP',
  /**
   * [general]
   * North Korea
   */
  KP: 'KP',
  /**
   * [general]
   * Norway
   */
  NO: 'NO',
  /**
   * [general]
   * Oman
   */
  OM: 'OM',
  /**
   * [general]
   * Pakistan
   */
  PK: 'PK',
  /**
   * [general]
   * Palau
   */
  PW: 'PW',
  /**
   * [general]
   * Palestinian Territories
   */
  PS: 'PS',
  /**
   * [general]
   * Panama
   */
  PA: 'PA',
  /**
   * [general]
   * Papua New Guinea
   */
  PG: 'PG',
  /**
   * [general]
   * Paraguay
   */
  PY: 'PY',
  /**
   * [general]
   * Peru
   */
  PE: 'PE',
  /**
   * [general]
   * Philippines
   */
  PH: 'PH',
  /**
   * [general]
   * Pitcairn Islands
   */
  PN: 'PN',
  /**
   * [general]
   * Poland
   */
  PL: 'PL',
  /**
   * [general]
   * Portugal
   */
  PT: 'PT',
  /**
   * [general]
   * Qatar
   */
  QA: 'QA',
  /**
   * [general]
   * Réunion
   */
  RE: 'RE',
  /**
   * [general]
   * Romania
   */
  RO: 'RO',
  /**
   * [general]
   * Russia
   */
  RU: 'RU',
  /**
   * [general]
   * Rwanda
   */
  RW: 'RW',
  /**
   * [general]
   * Samoa
   */
  WS: 'WS',
  /**
   * [general]
   * San Marino
   */
  SM: 'SM',
  /**
   * [general]
   * São Tomé & Príncipe
   */
  ST: 'ST',
  /**
   * [general]
   * Saudi Arabia
   */
  SA: 'SA',
  /**
   * [general]
   * Senegal
   */
  SN: 'SN',
  /**
   * [general]
   * Serbia
   */
  RS: 'RS',
  /**
   * [general]
   * Seychelles
   */
  SC: 'SC',
  /**
   * [general]
   * Sierra Leone
   */
  SL: 'SL',
  /**
   * [general]
   * Singapore
   */
  SG: 'SG',
  /**
   * [general]
   * Slovakia
   */
  SK: 'SK',
  /**
   * [general]
   * Slovenia
   */
  SI: 'SI',
  /**
   * [general]
   * Solomon Islands
   */
  SB: 'SB',
  /**
   * [general]
   * Somalia
   */
  SO: 'SO',
  /**
   * [general]
   * South Africa
   */
  ZA: 'ZA',
  /**
   * [general]
   * South Georgia & South Sandwich Islands
   */
  GS: 'GS',
  /**
   * [general]
   * South Korea
   */
  KR: 'KR',
  /**
   * [general]
   * Spain
   */
  ES: 'ES',
  /**
   * [general]
   * Sri Lanka
   */
  LK: 'LK',
  /**
   * [general]
   * St. Barthélemy
   */
  BL: 'BL',
  /**
   * [general]
   * St. Helena
   */
  SH: 'SH',
  /**
   * [general]
   * St. Kitts & Nevis
   */
  KN: 'KN',
  /**
   * [general]
   * St. Lucia
   */
  LC: 'LC',
  /**
   * [general]
   * St. Martin
   */
  MF: 'MF',
  /**
   * [general]
   * St. Pierre & Miquelon
   */
  PM: 'PM',
  /**
   * [general]
   * St. Vincent & Grenadines
   */
  VC: 'VC',
  /**
   * [general]
   * Sudan
   */
  SD: 'SD',
  /**
   * [general]
   * Suriname
   */
  SR: 'SR',
  /**
   * [general]
   * Svalbard & Jan Mayen
   */
  SJ: 'SJ',
  /**
   * [general]
   * Swaziland
   */
  SZ: 'SZ',
  /**
   * [general]
   * Sweden
   */
  SE: 'SE',
  /**
   * [general]
   * Switzerland
   */
  CH: 'CH',
  /**
   * [general]
   * Syria
   */
  SY: 'SY',
  /**
   * [general]
   * Taiwan
   */
  TW: 'TW',
  /**
   * [general]
   * Tajikistan
   */
  TJ: 'TJ',
  /**
   * [general]
   * Tanzania
   */
  TZ: 'TZ',
  /**
   * [general]
   * Thailand
   */
  TH: 'TH',
  /**
   * [general]
   * Timor-Leste
   */
  TL: 'TL',
  /**
   * [general]
   * Togo
   */
  TG: 'TG',
  /**
   * [general]
   * Tokelau
   */
  TK: 'TK',
  /**
   * [general]
   * Tonga
   */
  TO: 'TO',
  /**
   * [general]
   * Trinidad & Tobago
   */
  TT: 'TT',
  /**
   * [general]
   * Tunisia
   */
  TN: 'TN',
  /**
   * [general]
   * Turkey
   */
  TR: 'TR',
  /**
   * [general]
   * Turkmenistan
   */
  TM: 'TM',
  /**
   * [general]
   * Turks & Caicos Islands
   */
  TC: 'TC',
  /**
   * [general]
   * Tuvalu
   */
  TV: 'TV',
  /**
   * [general]
   * Uganda
   */
  UG: 'UG',
  /**
   * [general]
   * Ukraine
   */
  UA: 'UA',
  /**
   * [general]
   * United Arab Emirates
   */
  AE: 'AE',
  /**
   * [general]
   * United Kingdom
   */
  GB: 'GB',
  /**
   * [general]
   * United States
   */
  US: 'US',
  /**
   * [general]
   * Uruguay
   */
  UY: 'UY',
  /**
   * [general]
   * U.S. Outlying Islands
   */
  UM: 'UM',
  /**
   * [general]
   * U.S. Virgin Islands
   */
  VI: 'VI',
  /**
   * [general]
   * Uzbekistan
   */
  UZ: 'UZ',
  /**
   * [general]
   * Vanuatu
   */
  VU: 'VU',
  /**
   * [general]
   * Vatican City
   */
  VA: 'VA',
  /**
   * [general]
   * Venezuela
   */
  VE: 'VE',
  /**
   * [general]
   * Vietnam
   */
  VN: 'VN',
  /**
   * [general]
   * Wallis & Futuna
   */
  WF: 'WF',
  /**
   * [general]
   * Western Sahara
   */
  EH: 'EH',
  /**
   * [general]
   * Yemen
   */
  YE: 'YE',
  /**
   * [general]
   * Zambia
   */
  ZM: 'ZM',
  /**
   * [general]
   * Zimbabwe
   */
  ZW: 'ZW'
});


/**
 * [general]
 * The list of countries codes
 */
export type CountryCodeEnum = $Values<typeof CountryCodeEnumValues>;

/**
 * [checkout]
 * Input is used as an argument for 'createOrder' mutation
 */
export type CreateOrderInput = {|
  /**
   * [checkout]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
|};

export const CurrencyValues = Object.freeze({
  AFN: 'AFN',
  ALL: 'ALL',
  AZN: 'AZN',
  DZD: 'DZD',
  AOA: 'AOA',
  ARS: 'ARS',
  AMD: 'AMD',
  AWG: 'AWG',
  AUD: 'AUD',
  BSD: 'BSD',
  BHD: 'BHD',
  BDT: 'BDT',
  BBD: 'BBD',
  BYR: 'BYR',
  BZD: 'BZD',
  BMD: 'BMD',
  BTN: 'BTN',
  BOB: 'BOB',
  BAM: 'BAM',
  BWP: 'BWP',
  BRL: 'BRL',
  GBP: 'GBP',
  BND: 'BND',
  BGN: 'BGN',
  BUK: 'BUK',
  BIF: 'BIF',
  KHR: 'KHR',
  CAD: 'CAD',
  CVE: 'CVE',
  CZK: 'CZK',
  KYD: 'KYD',
  GQE: 'GQE',
  CLP: 'CLP',
  CNY: 'CNY',
  COP: 'COP',
  KMF: 'KMF',
  CDF: 'CDF',
  CRC: 'CRC',
  HRK: 'HRK',
  CUP: 'CUP',
  DKK: 'DKK',
  DJF: 'DJF',
  DOP: 'DOP',
  XCD: 'XCD',
  EGP: 'EGP',
  SVC: 'SVC',
  ERN: 'ERN',
  EEK: 'EEK',
  ETB: 'ETB',
  EUR: 'EUR',
  FKP: 'FKP',
  FJD: 'FJD',
  GMD: 'GMD',
  GEK: 'GEK',
  GEL: 'GEL',
  GHS: 'GHS',
  GIP: 'GIP',
  GTQ: 'GTQ',
  GNF: 'GNF',
  GYD: 'GYD',
  HTG: 'HTG',
  HNL: 'HNL',
  HKD: 'HKD',
  HUF: 'HUF',
  ISK: 'ISK',
  INR: 'INR',
  IDR: 'IDR',
  IRR: 'IRR',
  IQD: 'IQD',
  ILS: 'ILS',
  JMD: 'JMD',
  JPY: 'JPY',
  JOD: 'JOD',
  KZT: 'KZT',
  KES: 'KES',
  KWD: 'KWD',
  KGS: 'KGS',
  LAK: 'LAK',
  LVL: 'LVL',
  LBP: 'LBP',
  LSL: 'LSL',
  LRD: 'LRD',
  LYD: 'LYD',
  LTL: 'LTL',
  MOP: 'MOP',
  MKD: 'MKD',
  MGA: 'MGA',
  MWK: 'MWK',
  MYR: 'MYR',
  MVR: 'MVR',
  LSM: 'LSM',
  MRO: 'MRO',
  MUR: 'MUR',
  MXN: 'MXN',
  MDL: 'MDL',
  MNT: 'MNT',
  MAD: 'MAD',
  MZN: 'MZN',
  MMK: 'MMK',
  NAD: 'NAD',
  NPR: 'NPR',
  ANG: 'ANG',
  YTL: 'YTL',
  NZD: 'NZD',
  NIC: 'NIC',
  NGN: 'NGN',
  KPW: 'KPW',
  NOK: 'NOK',
  OMR: 'OMR',
  PKR: 'PKR',
  PAB: 'PAB',
  PGK: 'PGK',
  PYG: 'PYG',
  PEN: 'PEN',
  PHP: 'PHP',
  PLN: 'PLN',
  QAR: 'QAR',
  RHD: 'RHD',
  RON: 'RON',
  RUB: 'RUB',
  RWF: 'RWF',
  SHP: 'SHP',
  STD: 'STD',
  SAR: 'SAR',
  RSD: 'RSD',
  SCR: 'SCR',
  SLL: 'SLL',
  SGD: 'SGD',
  SKK: 'SKK',
  SBD: 'SBD',
  SOS: 'SOS',
  ZAR: 'ZAR',
  KRW: 'KRW',
  LKR: 'LKR',
  SDG: 'SDG',
  SRD: 'SRD',
  SZL: 'SZL',
  SEK: 'SEK',
  CHF: 'CHF',
  SYP: 'SYP',
  TWD: 'TWD',
  TJS: 'TJS',
  TZS: 'TZS',
  THB: 'THB',
  TOP: 'TOP',
  TTD: 'TTD',
  TND: 'TND',
  TMM: 'TMM',
  USD: 'USD',
  UGX: 'UGX',
  UAH: 'UAH',
  AED: 'AED',
  UYU: 'UYU',
  UZS: 'UZS',
  VUV: 'VUV',
  VEB: 'VEB',
  VEF: 'VEF',
  VND: 'VND',
  CHE: 'CHE',
  CHW: 'CHW',
  XOF: 'XOF',
  WST: 'WST',
  YER: 'YER',
  ZMK: 'ZMK',
  ZWD: 'ZWD',
  TRY: 'TRY',
  AZM: 'AZM',
  ROL: 'ROL',
  TRL: 'TRL',
  XPF: 'XPF'
});


/**
 * [general]
 * The list of available currency codes. Is Consumed by 'react-intl' package to define monetary display format
 */
export type Currency = $Values<typeof CurrencyValues>;

/**
 * [sales][VELO]
 * Provides affiliate program dasboard data
 */
export type CustomerAffiliateProgramDashboard = {|
  __typename?: 'CustomerAffiliateProgramDashboard',
  /**
   * [sales][VELO]
   * Number of points
   */
  points?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [sales][VELO]
   * Earning rules
   */
  earning_rules?: ?Array<?EarningRule>,
  /**
   * [sales][VELO]
   * Spending rules
   */
  spending_rules?: ?Array<?SpendingRule>,
  /**
   * [sales][VELO]
   * Tier info
   */
  tier_info?: ?TierInfo,
|};

export type CustomerNote = {|
  __typename?: 'CustomerNote',
  /**
   * [quote][BAT]
   * Customer note code
   */
  code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote][BAT]
   * Customer note label
   */
  label?: ?$ElementType<Scalars, 'String'>,
|};

export type DeleteAddressInput = {|
  /**
   * [account]
   * Customer address id
   */
  address_id?: ?$ElementType<Scalars, 'ID'>,
|};

export type DeleteSavedPaymentInput = {|
  /**
   * [account]
   * Saved payment public hash
   */
  public_hash?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [product][BAT]
 * Provides product design attributes
 */
export type DesignAttribute = {|
  __typename?: 'DesignAttribute',
  /**
   * [product][BAT]
   * A place. Specifies where data is inserted
   */
  place?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product][BAT]
   * Attribute value
   */
  value?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product][BAT]
   * Attribute code
   */
  code?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [sales][BAT]
 * Provides order discount data
 */
export type Discount = {|
  __typename?: 'Discount',
  /**
   * [sales][BAT]
   * Discount amount
   */
  amount?: ?Money,
  /**
   * [sales][BAT]
   * Discount label
   */
  label?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [quote]
 * Provides discounts information
 */
export type Discounts = {|
  __typename?: 'Discounts',
  /**
   * [quote]
   * Discount label
   */
  label?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Applied discount to the current shopping cart
   */
  applied_discount?: ?Money,
  /**
   * [quote]
   * Applied discount to the current shopping cart in percent
   */
  percent?: ?$ElementType<Scalars, 'Float'>,
|};

export type District = {|
  __typename?: 'District',
  /**
   * [common][BAT]
   * District ID
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [common][BAT]
   * District Code
   */
  code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common][BAT]
   * District Name
   */
  name?: ?$ElementType<Scalars, 'String'>,
|};

export type Dob = {|
  __typename?: 'Dob',
  /**
   * [restrict-access][BAT]
   * Date of birth extracted from National ID
   */
  dob?: ?$ElementType<Scalars, 'String'>,
|};

export type DocumentInput = {|
  /**
   * [restrict-access][BAT]
   * The name of uploaded file
   */
  filename?: ?$ElementType<Scalars, 'String'>,
  /**
   * [restrict-access][BAT]
   * String convertation to base64 format
   */
  base64_file?: ?$ElementType<Scalars, 'String'>,
  /**
   * [restrict-access][BAT]
   * Document type
   */
  document_type?: ?$ElementType<Scalars, 'String'>,
|};

export type DocumentTypes = {|
  __typename?: 'DocumentTypes',
  /**
   * [restrict-access][BAT]
   * The type of document
   */
  key?: ?$ElementType<Scalars, 'String'>,
  /**
   * [restrict-access][BAT]
   * Document type name
   */
  label?: ?$ElementType<Scalars, 'String'>,
|};

export type DocumentUserInfo = {|
  __typename?: 'DocumentUserInfo',
  /**
   * [restrict-access][BAT]
   * User first name
   */
  first_name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [restrict-access][BAT]
   * User last name
   */
  last_name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [restrict-access][BAT]
   * User date of birth
   */
  dob?: ?$ElementType<Scalars, 'String'>,
  /**
   * [restrict-access][BAT]
   * Verified document number
   */
  document_number?: ?$ElementType<Scalars, 'String'>,
|};

export type EarnPoints = {|
  __typename?: 'EarnPoints',
  /**
   * [quote][BAT]
   * Points
   */
  points?: ?$ElementType<Scalars, 'Int'>,
|};

/**
 * [sales][VELO]
 * Earning rules
 */
export type EarningRule = {|
  __typename?: 'EarningRule',
  /**
   * [sales][VELO]
   * Earning rule label
   */
  label?: ?$ElementType<Scalars, 'String'>,
|};

export type EditAddressInput = {|
  /**
   * [account]
   * Customer address id
   */
  address_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [account]
   * customer address
   */
  address?: ?AddressInput,
  /**
   * [account]
   * Is current address a default shipping address
   */
  default_shipping?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [account]
   * Is current address a default billing address
   */
  default_billing?: ?$ElementType<Scalars, 'Boolean'>,
|};

/**
 * [product][BAT]
 * Device engraving font
 */
export type EngraveFont = {|
  __typename?: 'EngraveFont',
  /**
   * [product][BAT]
   * Font identifier
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product][BAT]
   * Font name
   */
  name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product][BAT]
   * Font preview text
   */
  preview_text?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product][BAT]
   * Font file
   */
  font_file?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product][BAT]
   * Font size
   */
  font_size?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [product][BAT]
 * Device engraving icon
 */
export type EngraveIcon = {|
  __typename?: 'EngraveIcon',
  /**
   * [product][BAT]
   * Icon identifier
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product][BAT]
   * Icon name
   */
  name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product][BAT]
   * Icon thumbnail image
   */
  thumbnail_image?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product][BAT]
   * Icon image
   */
  icon_image?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [product][BAT]
 * Device engraving options
 */
export type EngraveOptions = {|
  __typename?: 'EngraveOptions',
  /**
   * [product][BAT]
   * List of icons
   */
  icons?: ?Array<?EngraveIcon>,
  /**
   * [product][BAT]
   * List of patterns
   */
  patterns?: ?Array<?EngravePattern>,
  /**
   * [product][BAT]
   * List of fonts
   */
  fonts?: ?Array<?EngraveFont>,
|};

/**
 * [product][BAT]
 * Device engraving pattern
 */
export type EngravePattern = {|
  __typename?: 'EngravePattern',
  /**
   * [product][BAT]
   * Pattern identifier
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product][BAT]
   * Pattern name
   */
  name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product][BAT]
   * Pattern thumbnail image
   */
  thumbnail_image?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product][BAT]
   * Pattern image
   */
  pattern_image?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product][BAT]
   * Pattern category name
   */
  category_name?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [quote][BAT]
 * Engraved options info
 */
export type EngravedOptionsInfo = {|
  __typename?: 'EngravedOptionsInfo',
  /**
   * [quote][BAT]
   * Flag identifies if product is personalisable
   */
  psn_is_personalisable?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [quote][BAT]
   * Pattern identifier
   */
  psn_front_pattern_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote][BAT]
   * Pattern name
   */
  psn_front_pattern?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote][BAT]
   * Icon identifier
   */
  psn_front_icon_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote][BAT]
   * Icon name
   */
  psn_front_icon?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote][BAT]
   * Text font family identifier
   */
  psn_back_text_font_family_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote][BAT]
   * Text font family
   */
  psn_back_text_font_family?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote][BAT]
   * Engraving text direction
   */
  psn_back_text_direction?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote][BAT]
   * Engraving text
   */
  psn_back_text?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [quote][BAT]
 * Input is used as a part for 'CartItemInput' input
 */
export type EngravedOptionsInput = {|
  /**
   * [quote][BAT]
   * Flag identifies if product is personalisable
   */
  psn_is_personalisable?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [quote][BAT]
   * Pattern identifier
   */
  psn_front_pattern_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote][BAT]
   * Pattern name
   */
  psn_front_pattern?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote][BAT]
   * Icon identifier
   */
  psn_front_icon_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote][BAT]
   * Icon name
   */
  psn_front_icon?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote][BAT]
   * Text font family identifier
   */
  psn_back_text_font_family_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote][BAT]
   * Text font family
   */
  psn_back_text_font_family?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote][BAT]
   * Engraving text direction
   */
  psn_back_text_direction?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote][BAT]
   * Engraving text
   */
  psn_back_text?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [product][BAT]
 * Input is used as an argument for 'ValidateEngravingTextMutation' mutation
 */
export type EngravingTextInput = {|
  /**
   * [product][BAT]
   * Text to validate
   */
  engraving_text?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [product][BAT]
 * Device engraving text validation output
 */
export type EngravingTextOutput = {|
  __typename?: 'EngravingTextOutput',
  /**
   * [product][BAT]
   * Flag identifies if engraving text is valid
   */
  is_valid?: ?$ElementType<Scalars, 'Boolean'>,
|};

/**
 * [url-resolver]
 * EntityUrl is an output object containing the id, url, entity_id and entity_type attributes
 */
export type EntityUrl = {|
  __typename?: 'EntityUrl',
  /**
   * [url-resolver]
   * The ID assigned to the object associated with the specified url. This could be a product ID, category ID, or page ID.
   */
  entity_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [url-resolver]
   * One of PRODUCT, CATEGORY, or CMS_PAGE.
   */
  entity_type?: ?UrlRewriteEntityTypeEnum,
  /**
   * [url-resolver][BAT]
   * Alternative versions of the page
   */
  hreflangs?: ?Array<?Hreflang>,
  /**
   * [url-resolver]
   * The ID assigned to the object associated with the specified url.
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [url-resolver][BAT]
   * Url, where user should be redirected if the previous one was changed
   */
  redirect_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [url-resolver]
   * The internal relative URL. If the specified  url is a redirect, the query returns the redirected URL, not the original.
   */
  url?: ?$ElementType<Scalars, 'RelativeUrl'>,
|};


/**
 * [espay][BAT]
 * Configuration for Espay iframe
 * https://sandbox-kit.espay.id/docs/v2/docespay/en/embedkit.php
 */
export type EspayConfig = {|
  __typename?: 'EspayConfig',
  /**
   * [espay][BAT]
   * Key provided by Espay Integration Team
   */
  key?: ?$ElementType<Scalars, 'String'>,
  /**
   * [espay][BAT]
   * Merchant url for confirmation page
   */
  back_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [espay][BAT]
   * Display provided by Espay. There are choice provided by Espay, such as tab, select list, and radio box option,
   * Default : select For tab display set value = ‘tab’
   * For radio box display set value = ‘option’
   */
  display?: ?$ElementType<Scalars, 'String'>,
  /**
   * [espay][BAT]
   * Redirect to the Espay payment system. It could be changed depends on the server mode:
   * Development : https://sandbox-kit.espay.id/public/signature/js
   * Production : https://kit.espay.id/public/signature/js
   */
  espay_url?: ?$ElementType<Scalars, 'AbsoluteUrl'>,
|};

/**
 * [espay][BAT]
 * Input is used to send data of chosen espay payment method
 */
export type EspayPaymentAndPlaceOrderInput = {|
  /**
   * [espay][BAT]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
|};

/**
 * [espay][BAT]
 * Payment Chanel Params
 */
export type EspayPaymentItem = {|
  __typename?: 'EspayPaymentItem',
  /**
   * [espay][BAT]
   * It's used as method's id, also it's a part of a method's background image url
   */
  product_code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [espay][BAT]
   * This parameter is need to form an input value
   */
  bank_code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [espay][BAT]
   * Method's name. It's used a as title attribute
   */
  product_name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [espay][BAT]
   * Category Name
   */
  category?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [espay][BAT]
 * Input is used to send data of chosen espay payment method and order ID to form an appropriate URL on the Espay side
 */
export type EspayPaymentMethodInput = {|
  /**
   * [espay][BAT]
   * Payment method's code
   */
  product_code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [espay][BAT]
   * Payment method's value
   */
  bank_code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [espay][BAT]
   * Order ID
   */
  order_id?: ?$ElementType<Scalars, 'ID'>,
|};

/**
 * [product]
 * Filters, used for filter navigation
 */
export type Filter = {|
  __typename?: 'Filter',
  /**
   * [product]
   * The ID assigned to the filter, used in 'FilterInput' as 'filter_id'
   */
  filter_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product]
   * One of the 'FilterType' options, used to define how filter will be displayed in Application
   */
  type?: ?FilterType,
  /**
   * [product]
   * The filter name, user friendly title
   */
  name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [product]
   * List of options available for the filter
   */
  options?: ?Array<?FilterOption>,
|};

/**
 * [product]
 * Filter input is used as an argument for 'productSearch' query
 */
export type FilterInput = {|
  /**
   * [product]
   * Filter ID - should be 'Filter.id'
   */
  filter_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product]
   * Filter values - should be an array of 'FilterOption.id'
   * In case Filter doesn't support multiselect, send as array with one value
   */
  values?: ?Array<?$ElementType<Scalars, 'String'>>,
|};

/**
 * [product]
 * Filter option defines the values of filter navigarion
 */
export type FilterOption = {|
  __typename?: 'FilterOption',
  /**
   * [product]
   * The ID assigned to the filter option, used in 'FilterInput' as 'values' item
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product]
   * The filter option name, user friendly title, can be used as tooltip or part of tooltip
   */
  name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [product]
   * Detailed information about the filter option. The value can include simple HTML tags
   */
  description?: ?$ElementType<Scalars, 'EscapedString'>,
  /**
   * [product]
   * Value of the filter option (can be same as id)
   */
  value?: ?$ElementType<Scalars, 'String'>,
|};

export const FilterTypeValues = Object.freeze({
  /**
   * [product]
   * Radio buttons, only one value can be selected
   */
  RADIO: 'RADIO',
  /**
   * [product]
   * Checkboxes, multiple values can be selected
   */
  MULTISELECT: 'MULTISELECT',
  /**
   * [product]
   * Dropdown, only one value can be selected
   */
  DROPDOWN: 'DROPDOWN',
  /**
   * [product]
   * If toggler is in 'true' state, 'id' of the first 'FilterOption' from 'Filter' 'options' array is sent as the only
   * element of 'values' array in 'FilterInput'.
   * If toggler is in 'false' state, 'FilterInput' for this 'Filter' is not being sent
   */
  TOGGLE: 'TOGGLE',
  /**
   * [product]
   * Range between two values (minimal and maximum)
   */
  RANGE: 'RANGE',
  /**
   * [product]
   * Checkboxes with text swatch, multiple values can be selected
   */
  TEXT_SWATCH: 'TEXT_SWATCH',
  /**
   * [product]
   * Checkboxes with visual swatch, multiple values can be selected
   */
  COLOR_SWATCH: 'COLOR_SWATCH'
});


/** [product] Filter type is used to define how filter will be displayed in Application */
export type FilterType = $Values<typeof FilterTypeValues>;

export type FilterTypeInput = {|
  /**
   * [blog][BAT]
   * Equals
   */
  eq?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * From. Must be used with 'to'
   */
  from?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Greater than
   */
  gt?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Greater than or equal to
   */
  gteq?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * In. The value can contain a set of comma-separated values
   */
  in?: ?Array<?$ElementType<Scalars, 'String'>>,
  /**
   * [blog][BAT]
   * Like. The specified value can contain % (percent signs) to allow matching of 0 or more characters
   */
  like?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Less than
   */
  lt?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Less than or equal to
   */
  lteq?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * More than or equal to
   */
  moreq?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Not equal to
   */
  neq?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Not in. The value can contain a set of comma-separated values
   */
  nin?: ?Array<?$ElementType<Scalars, 'String'>>,
  /**
   * [blog][BAT]
   * Not null
   */
  notnull?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Is null
   */
  null?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * To. Must be used with 'from'
   */
  to?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [free-gift][BAT]
 * Provides free gift items
 */
export type FreeGiftItems = {|
  __typename?: 'FreeGiftItems',
  /**
   * [free-gift][BAT]
   * Sales rule ID
   */
  rule_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [free-gift][BAT]
   * Flag shows that free gift items are automatically applied
   */
  is_auto_add?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [free-gift][BAT]
   * Free gift items
   */
  items?: ?Array<?CartItem>,
|};

export const GenderEnumValues = Object.freeze({
  FEMALE: 'FEMALE',
  MALE: 'MALE',
  NOT_SPECIFIED: 'NOT_SPECIFIED'
});


export type GenderEnum = $Values<typeof GenderEnumValues>;

/**
 * [product]
 * GiftAttributes contains gift card information, that can be dynamically edited by merchant
 */
export type GiftAttributes = {|
  __typename?: 'GiftAttributes',
  /**
   * [product]
   * Gift Card type
   */
  card_type?: ?GiftCardType,
  /**
   * [product]
   * List of predefined amounts
   */
  amounts?: ?Array<?Money>,
  /**
   * [product]
   * Defines custom minimum amount
   */
  amount_from?: ?Money,
  /**
   * [product]
   * Defines custom maximum amount
   */
  amount_to?: ?Money,
|};

/**
 * [general]
 * Provides gift card information
 */
export type GiftCard = {|
  __typename?: 'GiftCard',
  /**
   * [quote]
   * Applied balance to the current shopping cart
   */
  applied_balance?: ?Money,
  /**
   * [gift-card]
   * Current balance remaining on gift card
   */
  balance?: ?Money,
  /**
   * [gift-card]
   * Gift card code
   */
  code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [gift-card]
   * Gift card expiration date
   */
  expiration_date?: ?$ElementType<Scalars, 'String'>,
  /**
   * [general]
   * Gift card ID
   */
  id?: ?$ElementType<Scalars, 'ID'>,
|};

/**
 * [quote]
 * Input is used as a part for 'UpdateGiftCardCartItemsInput' input
 */
export type GiftCardCartItemUpdateInput = {|
  /**
   * [quote]
   * Cart item ID
   */
  cart_item_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [quote]
   * Amount of gift card
   */
  amount?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [quote]
   * Recipient name
   */
  recipient_name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [quote]
   * Recipient email
   */
  recipient_email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Senders name
   */
  senders_name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [quote]
   * Senders email
   */
  senders_email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * The gift card message, filled in by sender
   */
  message?: ?$ElementType<Scalars, 'EscapedString'>,
|};

/**
 * [gift-card]
 * Gift card item information
 */
export type GiftCardItem = {|
  __typename?: 'GiftCardItem',
  /**
   * [gift-card]
   * Gift card amount
   */
  amount?: ?Money,
  /**
   * [gift-card]
   * Recipient name
   */
  recipient_name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [gift-card]
   * Recipient email
   */
  recipient_email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [gift-card]
   * Senders name
   */
  senders_name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [gift-card]
   * Senders email
   */
  senders_email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [gift-card]
   * The gift card message, filled in by sender
   */
  message?: ?$ElementType<Scalars, 'EscapedString'>,
|};

export const GiftCardTypeValues = Object.freeze({
  /**
   * [product]
   * Virtual gift cards are delivered by email to the recipient.
   */
  VIRTUAL: 'VIRTUAL',
  /**
   * [product]
   * Physical gift cards can be mass produced in advance and embossed with unique codes.
   */
  PHYSICAL: 'PHYSICAL',
  /**
   * [product]
   * A combined gift card has the characteristics of both a virtual and physical gift card.
   */
  COMBINED: 'COMBINED'
});


/**
 * [product]
 * Gift Card type is used to identify, what type specific properties gift card product can contain
 * Each Gift Card Product can only have one type
 */
export type GiftCardType = $Values<typeof GiftCardTypeValues>;


export type HomepageMeta = {|
  __typename?: 'HomepageMeta',
  /**
   * [common][BAT]
   * Home Page meta title
   */
  title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common][BAT]
   * Home Page meta description
   */
  description?: ?$ElementType<Scalars, 'String'>,
|};

export type Hreflang = {|
  __typename?: 'Hreflang',
  /**
   * [url-resolver][BAT]
   * Alternative version language
   */
  language?: ?$ElementType<Scalars, 'String'>,
  /**
   * [url-resolver][BAT]
   * Alternative version url
   */
  url?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [general]
 * Generic Image type, that is used across whole application
 */
export type Image = {|
  __typename?: 'Image',
  /**
   * [general]
   * The ID assigned to the image, can be equal to url
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [general]
   * User friendly text, that is used in 'alt' attribute
   */
  alt?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [general]
   * User friendly text, that is used in 'title' attribute or in tooltip
   */
  name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [general]
   * Relative or absolute path to the image
   */
  url?: ?$ElementType<Scalars, 'AbsoluteUrl'>,
|};

/**
 * [product]
 * Provides inventory information of the current product, like in_stock or stock quantity
 */
export type Inventory = {|
  __typename?: 'Inventory',
  /**
   * [product]
   * explicitly says, that product is in stock
   */
  in_stock?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [product]
   * True, when quantity is unlimited or infinity
   */
  unlimited?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [product]
   * The stock level of the product, positive number
   */
  qty?: ?$ElementType<Scalars, 'Float'>,
|};

/**
 * [sales]
 * Provides order invoice information
 */
export type Invoice = {|
  __typename?: 'Invoice',
  /**
   * [sales]
   * Invoice ID
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [sales]
   * Timestamp indicating when the invoice was created
   */
  created_at?: ?$ElementType<Scalars, 'String'>,
  /**
   * [sales]
   * Invoice status
   */
  status?: ?InvoiceStatus,
  /**
   * [sales]
   * Invoice items
   */
  items?: ?Array<?OrderItem>,
  /**
   * [sales]
   * Subtotal, taxes, discounts, grand total, etc
   */
  prices?: ?OrderPrices,
|};

/**
 * [sales]
 * Provides invoice status information
 */
export type InvoiceStatus = {|
  __typename?: 'InvoiceStatus',
  /**
   * [sales]
   * Status code
   */
  code?: ?InvoiceStatusEnum,
  /**
   * [sales]
   * Status name
   */
  name?: ?$ElementType<Scalars, 'String'>,
|};

export const InvoiceStatusEnumValues = Object.freeze({
  /**
   * [sales]
   * Open
   */
  OPEN: 'OPEN',
  /**
   * [sales]
   * Canceled
   */
  CANCELED: 'CANCELED',
  /**
   * [sales]
   * Paid
   */
  PAID: 'PAID',
  /**
   * [sales]
   * Failed
   */
  FAILED: 'FAILED'
});


/**
 * [sales]
 * Invoice status codes
 */
export type InvoiceStatusEnum = $Values<typeof InvoiceStatusEnumValues>;


export type KtpId = {|
  __typename?: 'KtpId',
  /**
   * [user][BAT]
   * KTP id
   */
  ktp_id?: ?$ElementType<Scalars, 'ID'>,
|};


export type LoginInput = {|
  /**
   * [user]
   * Login string, like email, nickname, phone number or any other identification string
   */
  login?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * Password String
   */
  password?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * Add items in wishlist.
   */
  wishlist_items_simple?: ?AddItemsToWishlistInput,
  /**
   * [user]
   * Add configurable items to wishlist.
   */
  wishlist_items_configurable?: ?AddConfigurableItemsToWishlistInput,
  /**
   * [user]
   * Add editable bundle items to wishlist.
   */
  wishlist_items_editable_bundle?: ?AddBundleItemsToWishlistInput,
  /**
   * [user]
   * Add giftcard items in wishlist.
   */
  wishlist_items_giftcard?: ?AddGiftCardItemToWishlistInput,
  /**
   * [user]
   * Add grouped items in wishlist.
   */
  wishlist_items_grouped?: ?AddGroupedItemsToWishlistInput,
|};

export type MenuItem = {|
  __typename?: 'MenuItem',
  /**
   * [catalog][BAT]
   * Menu item id
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [catalog][BAT]
   * Menu item type
   */
  type?: ?MenuItemType,
  /**
   * [catalog][BAT]
   * Menu item title
   */
  title: $ElementType<Scalars, 'String'>,
  /**
   * [catalog][BAT]
   * Menu item identifier
   */
  identifier?: ?$ElementType<Scalars, 'String'>,
  /**
   * [catalog][BAT]
   * Menu item parent id if any
   */
  parent?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [catalog][BAT]
   * Menu item position for sorting
   */
  position?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [catalog][BAT]
   * Is menu item a link
   */
  is_link?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [catalog][BAT]
   * Menu item link url
   */
  url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [catalog][BAT]
   * If menu item should be visible to just guest customers, just logged in customers or both
   */
  is_logged_in?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [catalog][BAT]
   * Menu item frontend class extracted from custom options
   */
  frontend_class?: ?$ElementType<Scalars, 'String'>,
  /**
   * [catalog][BAT]
   * Menu item styles extracted from custom options
   */
  style?: ?$ElementType<Scalars, 'String'>,
  /**
   * [catalog][BAT]
   * Menu item content
   */
  content?: ?$ElementType<Scalars, 'String'>,
  /**
   * [catalog][BAT]
   * CMS block content
   */
  cms_block_content?: ?$ElementType<Scalars, 'String'>,
  /**
   * [catalog][BAT]
   * A comma-separated list of keywords that are visible only to search engines
   */
  meta_keywords?: ?$ElementType<Scalars, 'String'>,
  /**
   * [catalog][BAT]
   * A string that is displayed in the title bar and tab of the browser and in search results lists
   */
  meta_title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [catalog][BAT]
   * A brief overview of the category for search results listings, maximum 255 characters
   */
  meta_description?: ?$ElementType<Scalars, 'String'>,
  /**
   * [catalog][BAT]
   * Children items
   */
  children?: ?Array<?MenuItem>,
|};

export const MenuItemTypeValues = Object.freeze({
  CMS_BLOCK: 'CMS_BLOCK',
  CATEGORY: 'CATEGORY',
  CUSTOM_LINK: 'CUSTOM_LINK'
});


export type MenuItemType = $Values<typeof MenuItemTypeValues>;

/**
 * [general]
 * Money object defines a monetary value, including a numeric value and a currency code
 */
export type Money = {|
  __typename?: 'Money',
  /**
   * [general]
   * A three-letter currency code, such as USD or EUR
   */
  currency?: ?Currency,
  /**
   * [general]
   * A number expressing a monetary value
   */
  value?: ?$ElementType<Scalars, 'Float'>,
|};

/** [general] */
export type Mutation = {|
  __typename?: 'Mutation',
  /**
   * [user][BAT]
   * Activate user account
   */
  activateAccount?: ?Viewer,
  /**
   * [account]
   * User can add new address
   */
  addAddress?: ?Viewer,
  /**
   * [quote]
   * Add bundle items in shopping cart
   */
  addBundleItemsToCart?: ?Cart,
  /**
   * [wishlist]
   * Add bundle items to wishlist.
   * Creates guest wishlist for unauthorized users after successfully adding if applicable
   */
  addBundleItemsToWishlist?: ?Wishlist,
  /** Add Subscription Category */
  addCategorySubscription?: ?PushSubscription,
  /**
   * [quote]
   * Add configurable items in shopping cart
   */
  addConfigurableItemsToCart?: ?Cart,
  /**
   * [wishlist]
   * Add configurable items to wishlist.
   * Creates guest wishlist for unauthorized users after successfully adding if applicable
   */
  addConfigurableItemsToWishlist?: ?Wishlist,
  /**
   * [quote]
   * Add coupon on cart
   */
  addCouponToCart?: ?Cart,
  /**
   * [quote][BAT]
   * Add customer KTP ID to cart
   */
  addCustomerKtpIdToCart?: ?Cart,
  /**
   * [quote][BAT]
   * Add customer note to cart
   */
  addCustomerNoteToCart?: ?Cart,
  /**
   * [quote][BAT]
   * Add DoB to cart
   */
  addDobToCart?: ?Cart,
  addFreeGiftsToCart?: ?Cart,
  /**
   * [quote]
   * Add gift card items in shopping cart
   */
  addGiftCardItemsToCart?: ?Cart,
  /**
   * [wishlist]
   * Adds gift card items to wishlist.
   * Creates guest wishlist for unauthorized users after successfully adding if applicable
   */
  addGiftCardItemsToWishlist?: ?Wishlist,
  /**
   * [quote]
   * Add gift card on cart
   */
  addGiftCardToCart?: ?Cart,
  /**
   * [wishlist]
   * Add grouped items to wishlist.
   * Creates guest wishlist for unauthorized users after successfully adding if applicable
   */
  addGroupedItemsToWishlist?: ?Wishlist,
  /**
   * [quote]
   * Add simple items in shopping cart
   */
  addItemsToCart?: ?Cart,
  /**
   * [wishlist]
   * Adds simple items to wishlist.
   * Creates guest wishlist for unauthorized users after successfully adding if applicable
   */
  addItemsToWishlist?: ?Wishlist,
  /** Add Push Subscription */
  addPushSubscription?: ?PushSubscription,
  /**
   * [quote][BAT]
   * Add referral code to cart
   */
  addReferralCodeToCart?: ?ReferralCode,
  addReview?: ?Review,
  /**
   * [quote][BAT]
   * Apply points to cart
   */
  applyPointsToCart?: ?Cart,
  /**
   * [ccavenue][BAT]
   * Set cart_id to create order and get data for payment
   */
  ccavenuePlaceOrder?: ?CcAvenueRedirect,
  /**
   * [ccavenue][BAT]
   * Set response data to confirm payment
   */
  ccavenueResponse?: ?CheckoutOrder,
  /**
   * [checkout-com][BAT]
   * Fail the payment with the session ID
   */
  checkoutcomPaymentFail?: ?Cart,
  /**
   * [checkout-com][BAT]
   * Verify the payment with the session ID
   */
  checkoutcomPaymentVerify?: ?CheckoutOrder,
  /**
   * [checkout-com][BAT]
   * Set data from checkout.com payment method and place order
   */
  checkoutcomPlaceOrder?: ?CheckoutOrder,
  /**
   * [quote]
   * Create order on chekout
   */
  createOrder?: ?CheckoutOrder,
  /**
   * [account]
   * User can delete address
   */
  deleteAddress?: ?Viewer,
  /**
   * [account]
   * User can delete saved payment method
   */
  deleteSavedPayment?: ?Viewer,
  /**
   * [account]
   * User can edit his address
   */
  editAddress?: ?Viewer,
  /**
   * [user]
   * Login user to retrieve token and other information
   */
  login?: ?Viewer,
  /**
   * [user]
   * Logout user, removes auth token from server (Boolean type is for the purpose of nullable response)
   */
  logout?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [paynamics][BAT]
   * Verify the payment result
   */
  paynamicsResult?: ?CheckoutOrder,
  /**
   * [paynamics][BAT]
   * Start paynamics payment
   */
  paynamicsStart?: ?PaynamicsStart,
  /**
   * [user]
   * Register user to retrieve token and other information
   */
  register?: ?Viewer,
  /**
   * [quote]
   * Remove billing address from cart
   */
  removeBillingAddressOnCart?: ?Cart,
  /** Remove Subscription Category */
  removeCategorySubscription?: ?PushSubscription,
  /**
   * [quote]
   * Remove coupon from shopping cart
   */
  removeCouponFromCart?: ?Cart,
  /**
   * [quote][BAT]
   * Remove customer note from cart
   */
  removeCustomerNoteFromCart?: ?Cart,
  /**
   * [quote]
   * Remove gift card from shopping cart
   */
  removeGiftCardFromCart?: ?Cart,
  /**
   * [quote]
   * Remove item from shopping cart
   */
  removeItemFromCart?: ?Cart,
  /**
   * [wishlist]
   * Removes item from wishlist
   */
  removeItemFromWishlist?: ?Wishlist,
  /**
   * [quote][BAT]
   * Remove points from cart
   */
  removePointsFromCart?: ?Cart,
  /** Remove Push Subscription */
  removePushSubscription?: ?PushSubscription,
  /**
   * [quote][BAT]
   * Remove referral code from cart
   */
  removeReferralCodeFromCart?: ?ReferralCode,
  /**
   * [user]
   * Remove connected social provider.
   * Requires authorization.
   */
  removeSocialProvider?: ?Viewer,
  /**
   * [sales]
   * Reorder products from order
   */
  reorder?: ?Cart,
  /**
   * [user]
   * Send request to get reset password link
   */
  requestResetPassword?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [quote]
   * Set or unset necessity of saving current selected method to account saved payment methods
   */
  savePaymentMethod?: ?Cart,
  /**
   * [user][BAT]
   * Send confirmation link
   */
  sendConfirmationLink?: ?ConfirmationLink,
  /**
   * [contact-us][BAT]
   * Send Contact Us form data to CRM
   */
  sendContactUsFormToCRM?: ?ContactUsFormOutput,
  /**
   * [quote]
   * Set billing address as shipping
   */
  setBillingAddressAsShippingAddressOnCart?: ?Cart,
  /**
   * [quote]
   * Set billing address on cart
   */
  setBillingAddressOnCart?: ?Cart,
  /**
   * [quote]
   * Set billing address from address book on cart.
   * Requres authorization.
   */
  setBillingFromAddressBook?: ?Cart,
  /**
   * [account]
   * User can set address as default Billing Address
   */
  setDefaultBillingAddress?: ?Viewer,
  /**
   * [account]
   * User can set address as default Shipping Address
   */
  setDefaultShippingAddress?: ?Viewer,
  /**
   * [espay][BAT]
   * Set data from chosen espay payment method and place order
   */
  setEspayAndPlaceOrder?: ?CheckoutOrder,
  /**
   * [quote]
   * Set guest email on cart
   */
  setGuestEmailOnCart?: ?Cart,
  /**
   * [user]
   * Change password with reset token
   */
  setNewPassword?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [newsletter]
   * Add or remove a newsletter subscription
   */
  setNewsletter?: ?NewsletterInfo,
  /**
   * [quote]
   * Set payment method on cart
   */
  setPaymentMethodOnCart?: ?Cart,
  /**
   * [quote]
   * Set shipping addresses on cart
   */
  setShippingAddressesOnCart?: ?Cart,
  /**
   * [quote]
   * Set shipping addresses from address book on cart.
   * Requres authorization.
   */
  setShippingFromAddressBook?: ?Cart,
  /**
   * [quote]
   * Set shipping methods on cart
   */
  setShippingMethodsOnCart?: ?Cart,
  /**
   * [user]
   * Login/Register user via Social providers to retrieve token and other information
   */
  socialLogin?: ?Viewer,
  /**
   * [BAT][account]
   * Update and verify registered user information
   */
  updateAndVerifyViewer?: ?Viewer,
  /**
   * [quote]
   * Update bundle items in shopping cart
   */
  updateBundleCartItems?: ?Cart,
  /**
   * [wishlist]
   * Update bundle items in wishlist
   */
  updateBundleWishlistItems?: ?Wishlist,
  /**
   * [quote]
   * Update simple items in shopping cart
   */
  updateCartItems?: ?Cart,
  /**
   * [quote]
   * Update configurable items in shopping cart
   */
  updateConfigurableCartItems?: ?Cart,
  /**
   * [wishlist]
   * Update configurable items in wishlist
   */
  updateConfigurableWishlistItems?: ?Wishlist,
  /**
   * [quote]
   * Update gift card items in shopping cart
   */
  updateGiftCardCartItems?: ?Cart,
  /**
   * [wishlist]
   * Update gift card items in wishlist
   */
  updateGiftCardWishlistItems?: ?Wishlist,
  /**
   * [wishlist]
   * Update grouped items in wishlist
   */
  updateGroupedWishlistItems?: ?Wishlist,
  /**
   * [BAT][account]
   * Set data from chosen marketing preferences
   */
  updatePreferencesMutation?: ?UpdatePreferencesOutput,
  /**
   * [account]
   * Registered user updates information and password
   */
  updateViewer?: ?Viewer,
  /**
   * [wishlist]
   * Update simple items in wishlist
   */
  updateWishlistItems?: ?Wishlist,
  /**
   * [restrict-access][BAT]
   * Send request to verify user's age
   */
  uploadAndProcessDocument?: ?DocumentUserInfo,
  /**
   * [product][BAT]
   * Validate engraving text
   */
  validateEngravingText?: ?EngravingTextOutput,
  /**
   * [general]
   * Server version of mutations set
   */
  version?: ?$ElementType<Scalars, 'String'>,
|};


/** [general] */
export type MutationActivateAccountArgs = {|
  input?: ?ActivateAccountInput,
|};


/** [general] */
export type MutationAddAddressArgs = {|
  input?: ?AddAddressInput,
|};


/** [general] */
export type MutationAddBundleItemsToCartArgs = {|
  input?: ?AddBundleItemsToCartInput,
|};


/** [general] */
export type MutationAddBundleItemsToWishlistArgs = {|
  input?: ?AddBundleItemsToWishlistInput,
|};


/** [general] */
export type MutationAddCategorySubscriptionArgs = {|
  input?: ?CategorySubscriptionInput,
|};


/** [general] */
export type MutationAddConfigurableItemsToCartArgs = {|
  input?: ?AddConfigurableItemsToCartInput,
|};


/** [general] */
export type MutationAddConfigurableItemsToWishlistArgs = {|
  input?: ?AddConfigurableItemsToWishlistInput,
|};


/** [general] */
export type MutationAddCouponToCartArgs = {|
  input?: ?AddCouponToCartInput,
|};


/** [general] */
export type MutationAddCustomerKtpIdToCartArgs = {|
  input?: ?AddCustomerKtpIdToCartInput,
|};


/** [general] */
export type MutationAddCustomerNoteToCartArgs = {|
  input?: ?AddCustomerNoteToCartInput,
|};


/** [general] */
export type MutationAddDobToCartArgs = {|
  input?: ?AddDobToCartInput,
|};


/** [general] */
export type MutationAddFreeGiftsToCartArgs = {|
  input?: ?AddFreeGiftToCartInput,
|};


/** [general] */
export type MutationAddGiftCardItemsToCartArgs = {|
  input?: ?AddGiftCardItemsToCartInput,
|};


/** [general] */
export type MutationAddGiftCardItemsToWishlistArgs = {|
  input?: ?AddGiftCardItemToWishlistInput,
|};


/** [general] */
export type MutationAddGiftCardToCartArgs = {|
  input?: ?AddGiftCardToCartInput,
|};


/** [general] */
export type MutationAddGroupedItemsToWishlistArgs = {|
  input?: ?AddGroupedItemsToWishlistInput,
|};


/** [general] */
export type MutationAddItemsToCartArgs = {|
  input?: ?AddItemsToCartInput,
|};


/** [general] */
export type MutationAddItemsToWishlistArgs = {|
  input?: ?AddItemsToWishlistInput,
|};


/** [general] */
export type MutationAddPushSubscriptionArgs = {|
  input?: ?PushSubscriptionInput,
|};


/** [general] */
export type MutationAddReferralCodeToCartArgs = {|
  input?: ?AddReferralCodeToCartInput,
|};


/** [general] */
export type MutationAddReviewArgs = {|
  input?: ?AddReviewInput,
|};


/** [general] */
export type MutationApplyPointsToCartArgs = {|
  input?: ?ApplyPointsToCartInput,
|};


/** [general] */
export type MutationCcavenuePlaceOrderArgs = {|
  input?: ?CcAvenueRedirectInput,
|};


/** [general] */
export type MutationCcavenueResponseArgs = {|
  token?: ?$ElementType<Scalars, 'String'>,
|};


/** [general] */
export type MutationCheckoutcomPaymentFailArgs = {|
  input?: ?Payment3DsResultInput,
|};


/** [general] */
export type MutationCheckoutcomPaymentVerifyArgs = {|
  input?: ?Payment3DsResultInput,
|};


/** [general] */
export type MutationCheckoutcomPlaceOrderArgs = {|
  input?: ?CheckoutcomPlaceOrderInput,
|};


/** [general] */
export type MutationCreateOrderArgs = {|
  input?: ?CreateOrderInput,
|};


/** [general] */
export type MutationDeleteAddressArgs = {|
  input?: ?DeleteAddressInput,
|};


/** [general] */
export type MutationDeleteSavedPaymentArgs = {|
  input?: ?DeleteSavedPaymentInput,
|};


/** [general] */
export type MutationEditAddressArgs = {|
  input?: ?EditAddressInput,
|};


/** [general] */
export type MutationLoginArgs = {|
  input?: ?LoginInput,
|};


/** [general] */
export type MutationPaynamicsResultArgs = {|
  input?: ?PaynamicsResultInput,
|};


/** [general] */
export type MutationPaynamicsStartArgs = {|
  input?: ?PaynamicsStartInput,
|};


/** [general] */
export type MutationRegisterArgs = {|
  input?: ?RegisterInput,
|};


/** [general] */
export type MutationRemoveBillingAddressOnCartArgs = {|
  input?: ?RemoveBillingAddressOnCartInput,
|};


/** [general] */
export type MutationRemoveCategorySubscriptionArgs = {|
  input?: ?CategorySubscriptionInput,
|};


/** [general] */
export type MutationRemoveCouponFromCartArgs = {|
  input?: ?RemoveCouponFromCartInput,
|};


/** [general] */
export type MutationRemoveCustomerNoteFromCartArgs = {|
  input?: ?RemoveCustomerNoteFromCartInput,
|};


/** [general] */
export type MutationRemoveGiftCardFromCartArgs = {|
  input?: ?RemoveGiftCardFromCartInput,
|};


/** [general] */
export type MutationRemoveItemFromCartArgs = {|
  input?: ?RemoveItemFromCartInput,
|};


/** [general] */
export type MutationRemoveItemFromWishlistArgs = {|
  input?: ?RemoveItemFromWishlistInput,
|};


/** [general] */
export type MutationRemovePointsFromCartArgs = {|
  input?: ?RemovePointsFromCartInput,
|};


/** [general] */
export type MutationRemovePushSubscriptionArgs = {|
  input?: ?PushSubscriptionInput,
|};


/** [general] */
export type MutationRemoveReferralCodeFromCartArgs = {|
  input?: ?RemoveReferralCodeFromCartInput,
|};


/** [general] */
export type MutationRemoveSocialProviderArgs = {|
  input?: ?SocialLoginProviderEnum,
|};


/** [general] */
export type MutationReorderArgs = {|
  input?: ?ReorderInput,
|};


/** [general] */
export type MutationRequestResetPasswordArgs = {|
  input?: ?RequestResetPasswordInput,
|};


/** [general] */
export type MutationSavePaymentMethodArgs = {|
  input?: ?SavePaymentMethodInput,
|};


/** [general] */
export type MutationSendConfirmationLinkArgs = {|
  input?: ?SendConfirmationLinkInput,
|};


/** [general] */
export type MutationSendContactUsFormToCrmArgs = {|
  input?: ?ContactUsFormInput,
|};


/** [general] */
export type MutationSetBillingAddressAsShippingAddressOnCartArgs = {|
  input?: ?SetBillingAddressAsShippingAddressOnCartInput,
|};


/** [general] */
export type MutationSetBillingAddressOnCartArgs = {|
  input?: ?SetBillingAddressOnCartInput,
|};


/** [general] */
export type MutationSetBillingFromAddressBookArgs = {|
  input?: ?SetBillingFromAddressBookInput,
|};


/** [general] */
export type MutationSetDefaultBillingAddressArgs = {|
  input?: ?SetDefaultBillingAddressInput,
|};


/** [general] */
export type MutationSetDefaultShippingAddressArgs = {|
  input?: ?SetDefaultShippingAddressInput,
|};


/** [general] */
export type MutationSetEspayAndPlaceOrderArgs = {|
  input?: ?EspayPaymentAndPlaceOrderInput,
|};


/** [general] */
export type MutationSetGuestEmailOnCartArgs = {|
  input?: ?SetGuestEmailOnCartInput,
|};


/** [general] */
export type MutationSetNewPasswordArgs = {|
  input?: ?SetNewPasswordInput,
|};


/** [general] */
export type MutationSetNewsletterArgs = {|
  input?: ?SetNewsletterInput,
|};


/** [general] */
export type MutationSetPaymentMethodOnCartArgs = {|
  input?: ?SetPaymentMethodOnCartInput,
|};


/** [general] */
export type MutationSetShippingAddressesOnCartArgs = {|
  input?: ?SetShippingAddressesOnCartInput,
|};


/** [general] */
export type MutationSetShippingFromAddressBookArgs = {|
  input?: ?SetShippingFromAddressBookInput,
|};


/** [general] */
export type MutationSetShippingMethodsOnCartArgs = {|
  input?: ?SetShippingMethodsOnCartInput,
|};


/** [general] */
export type MutationSocialLoginArgs = {|
  input?: ?SocialLoginInput,
|};


/** [general] */
export type MutationUpdateAndVerifyViewerArgs = {|
  input?: ?UpdateViewerInput,
|};


/** [general] */
export type MutationUpdateBundleCartItemsArgs = {|
  input?: ?UpdateBundleCartItemsInput,
|};


/** [general] */
export type MutationUpdateBundleWishlistItemsArgs = {|
  input?: ?UpdateWishlistBundleItemsInput,
|};


/** [general] */
export type MutationUpdateCartItemsArgs = {|
  input?: ?UpdateCartItemsInput,
|};


/** [general] */
export type MutationUpdateConfigurableCartItemsArgs = {|
  input?: ?UpdateConfigurableCartItemsInput,
|};


/** [general] */
export type MutationUpdateConfigurableWishlistItemsArgs = {|
  input?: ?UpdateWishlistConfigurableItemsInput,
|};


/** [general] */
export type MutationUpdateGiftCardCartItemsArgs = {|
  input?: ?UpdateGiftCardCartItemsInput,
|};


/** [general] */
export type MutationUpdateGiftCardWishlistItemsArgs = {|
  input?: ?UpdateWishlistGiftCardItemsInput,
|};


/** [general] */
export type MutationUpdateGroupedWishlistItemsArgs = {|
  input?: ?UpdateWishlistGroupedItemsInput,
|};


/** [general] */
export type MutationUpdatePreferencesMutationArgs = {|
  input?: ?UpdatePreferencesInput,
|};


/** [general] */
export type MutationUpdateViewerArgs = {|
  input?: ?UpdateViewerInput,
|};


/** [general] */
export type MutationUpdateWishlistItemsArgs = {|
  input?: ?UpdateWishlistItemsInput,
|};


/** [general] */
export type MutationUploadAndProcessDocumentArgs = {|
  input?: ?DocumentInput,
|};


/** [general] */
export type MutationValidateEngravingTextArgs = {|
  input?: ?EngravingTextInput,
|};

/**
 * [newsletter]
 * Provides information about user who was subscribed on a newsletter
 */
export type NewsletterInfo = {|
  __typename?: 'NewsletterInfo',
  /**
   * [newsletter]
   * User email
   */
  email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [newsletter]
   * User first name in case if an user has account
   */
  first_name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [newsletter]
   * User last name in case if an user has account
   */
  last_name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [newsletter]
   * It's true if user is subscribed on newsletter and it's false - if unsubscribed
   */
  subscribed?: ?$ElementType<Scalars, 'Boolean'>,
|};

/**
 * [general]
 * Order information
 */
export type Order = {|
  __typename?: 'Order',
  /**
   * [sales]
   * Billing address of order
   */
  billing_address?: ?Address,
  /**
   * [sales]
   * Timestamp indicating when the order was created
   */
  created_at?: ?$ElementType<Scalars, 'String'>,
  /**
   * [sales][BAT]
   * Discount
   */
  discount?: ?Discount,
  /**
   * [checkout]
   * User email
   */
  email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [general]
   * Order Id
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [sales]
   * Order invoices
   */
  invoices?: ?Array<?Invoice>,
  /**
   * [sales]
   * Items in order
   */
  items?: ?Array<?OrderItem>,
  /**
   * [sales]
   * Payment methods of order
   */
  payment_methods?: ?Array<?PaymentMethod>,
  /**
   * [sales]
   * Subtotal, taxes, discounts, grand total, etc
   */
  prices?: ?OrderPrices,
  /**
   * [sales]
   * Order refunds
   */
  refunds?: ?Array<?Refund>,
  /**
   * [sales]
   * True, when user can return the order
   */
  returnable?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [sales][BAT]
   * Discount using reward points
   */
  rewards_discount?: ?RewardsDiscount,
  /**
   * [sales]
   * Order shipments
   */
  shipments?: ?Array<?Shipment>,
  /**
   * [sales]
   * Order status
   */
  status?: ?OrderStatus,
|};

/**
 * [sales]
 * Provides order items information
 */
export type OrderItem = {|
  __typename?: 'OrderItem',
  /**
   * [sales]
   * Bundle product options and total sum
   */
  bundle_info?: ?BundleInfo,
  /**
   * [sales][BAT]
   * Engraved Options
   */
  engraved_options?: ?EngravedOptionsInfo,
  /**
   * [sales]
   * Gift card information
   */
  gift_card?: ?GiftCardItem,
  /**
   * [sales]
   * Order item ID
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [sales]
   * Product variation information. Only for type CONFIGURABLE
   */
  order_variation_attributes?: ?Array<?OrderVariationAttribute>,
  /**
   * [sales][BAT]
   * Label from setting, or NULL if the setting is_hide_free_item_price is disabled
   */
  price_label?: ?$ElementType<Scalars, 'String'>,
  /**
   * [sales]
   * Order item product
   */
  product?: ?OrderItemProduct,
  /**
   * [sales]
   * Quantity of order products
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [sales]
   * True, when user can return the order item
   */
  returnable?: ?$ElementType<Scalars, 'Boolean'>,
|};

export type OrderItemProduct = {|
  __typename?: 'OrderItemProduct',
  /**
   * [sales]
   * Product ID
   */
  product_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [sales]
   * The product name. Customers use this name to identify the product
   */
  name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [sales]
   * Identifies, which properties Product instance can contain
   */
  type?: ?ProductType,
  /**
   * [sales]
   * The thumbnail image of the product
   */
  thumbnail_image?: ?Image,
  /**
   * [sales]
   * Product gift card attributes
   */
  gift_attributes?: ?GiftAttributes,
  /**
   * [sales]
   * A ProductPrice object, indicating the price of an item
   */
  price?: ?ProductPrice,
  /**
   * [sales]
   * Product URL, used to set in browser location
   */
  url?: ?$ElementType<Scalars, 'RelativeUrl'>,
|};

/**
 * [sales]
 * Provides order prices information: subtotal, taxes, discounts, grand total, etc
 */
export type OrderPrices = {|
  __typename?: 'OrderPrices',
  /**
   * [sales]
   * Order subtotal
   */
  subtotal?: ?Money,
  /**
   * [sales]
   * Applied taxes
   */
  taxes?: ?Array<?TaxItem>,
  /**
   * [sales]
   * Order grand total
   */
  grand_total?: ?Money,
  /**
   * [sales]
   * Applied discounts
   */
  discounts?: ?Array<?Discounts>,
|};

/**
 * [sales]
 * Provides order search data
 */
export type OrderSearch = {|
  __typename?: 'OrderSearch',
  /**
   * [sales]
   * Offset of returned data for particular order search
   */
  start?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [sales]
   * The number of orders returned
   */
  count?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [sales]
   * Total number of orders matching specified criteria
   */
  total?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [sales]
   * An array of orders that match the specified search criteria
   */
  items?: ?Array<?Order>,
|};

/**
 * [sales]
 * Provides order status information
 */
export type OrderStatus = {|
  __typename?: 'OrderStatus',
  /**
   * [sales]
   * Status code
   */
  code?: ?OrderStatusEnum,
  /**
   * [sales]
   * Status name
   */
  name?: ?$ElementType<Scalars, 'String'>,
|};

export const OrderStatusEnumValues = Object.freeze({
  /**
   * [sales]
   * New
   */
  NEW: 'NEW',
  /**
   * [sales]
   * Processing (In progress)
   */
  PROCESSING: 'PROCESSING',
  /**
   * [sales]
   * Pending
   */
  PENDING: 'PENDING',
  /**
   * [sales]
   * Pending payment
   */
  PENDING_PAYMENT: 'PENDING_PAYMENT',
  /**
   * [sales]
   * Canceled
   */
  CANCELED: 'CANCELED',
  /**
   * [sales]
   * Complete
   */
  COMPLETE: 'COMPLETE',
  /**
   * [sales]
   * Closed
   */
  CLOSED: 'CLOSED',
  /**
   * [sales]
   * Holded
   */
  HOLDED: 'HOLDED',
  /**
   * [sales]
   * Payment review
   */
  PAYMENT_REVIEW: 'PAYMENT_REVIEW',
  /**
   * [sales]
   * Fraud
   */
  FRAUD: 'FRAUD'
});


/**
 * [sales]
 * Order status codes
 */
export type OrderStatusEnum = $Values<typeof OrderStatusEnumValues>;

export type OrderVariationAttribute = {|
  __typename?: 'OrderVariationAttribute',
  /**
   * [sales]
   * The ID assigned to the VariationAttribute
   */
  variation_attribute_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [sales]
   * VariationAttribute name
   */
  name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [sales]
   * The ID assigned to the value of VariationAttribute
   */
  variation_attribute_value_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [sales]
   * User friendly text, that is used in 'title' attribute or in tooltip
   */
  variation_attribute_value_name?: ?$ElementType<Scalars, 'LocalizedString'>,
|};

export type PakistanCity = {|
  __typename?: 'PakistanCity',
  /**
   * [common][VELO]
   * Courier id
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [common][VELO]
   * City of courier id
   */
  name?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [user][BAT]
 * Information for updating the customer's password on a new one, due to increasing the security level of a password
 */
export type PasswordInfo = {|
  __typename?: 'PasswordInfo',
  /**
   * [user][BAT]
   * Flag, which indicates that customer's password is updated
   */
  is_password_updated?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [user][BAT]
   * Token, which is required for updating the customer's password
   */
  rp_token?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [checkout-com][BAT]
 * Input is used as an argument for 'checkoutcomPaymentVerify' and 'checkoutcomPaymentFail' mutations
 */
export type Payment3DsResultInput = {|
  /**
   * [checkout-com][BAT]
   * Order identifier
   */
  order_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [checkout-com][BAT]
   * Session ID from checkout.com
   */
  cko_session_id?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [quote]
 * Provides payment method information in shopping cart
 */
export type PaymentMethod = {|
  __typename?: 'PaymentMethod',
  /**
   * [quote]
   * The payment method code
   */
  code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * The payment method name
   */
  name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Instructions for payment method
   */
  instruction?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Is offline payment method
   */
  is_offline?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [quote]
   * Flag that responsible if current payment method can be saved
   */
  can_be_saved?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [quote]
   * List of saved payments for current payment method
   */
  saved_payments?: ?Array<?SavedPayment>,
|};

/**
 * [quote]
 * Input is used as a part for 'SetPaymentMethodOnCartInput' input
 */
export type PaymentMethodInput = {|
  /**
   * [quote]
   * Payment method code
   */
  code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Saved payment public hash
   */
  public_hash?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [paynamics][BAT]
 * Input is used as an argument for 'PaynamicsResult' mutation
 */
export type PaynamicsResultInput = {|
  /**
   * [paynamics][BAT]
   * Parameter from GET request. Contains order ID
   */
  request_id?: ?$ElementType<Scalars, 'String'>,
|};

export type PaynamicsStart = {|
  __typename?: 'PaynamicsStart',
  /**
   * [paynamics][BAT]
   * URL for redirect
   */
  form_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [paynamics][BAT]
   * Form method
   */
  form_method?: ?$ElementType<Scalars, 'String'>,
  /**
   * [paynamics][BAT]
   * XML encoded in base 64
   */
  input_value?: ?$ElementType<Scalars, 'String'>,
  /**
   * [paynamics][BAT]
   * Name of field for input_value
   */
  input_name?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [paynamics][BAT]
 * Input is used as an argument for 'PaynamicsStart' mutation
 */
export type PaynamicsStartInput = {|
  /**
   * [paynamics][BAT]
   * Order ID
   */
  order_id?: ?$ElementType<Scalars, 'ID'>,
|};

export type PickupOption = {|
  __typename?: 'PickupOption',
  /**
   * [common][BAT]
   * Option ID
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [common][BAT]
   * Option value
   */
  label?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [product]
 * Price object defines the price of a product as well as any tax-related adjustments.
 */
export type Price = {|
  __typename?: 'Price',
  /**
   * [product]
   * Amount defines a monetary value, including a numeric value and a currency code
   */
  amount?: ?Money,
|};

/**
 * [general]
 * Product contains attributes that are common to all types of products
 */
export type Product = {|
  __typename?: 'Product',
  /**
   * [product]
   * Price of bundle with options that user selected
   */
  bundle_sum?: ?Money,
  /**
   * [product]
   * Options inside a bundle
   */
  bundled_products?: ?Array<?BundleOption>,
  /**
   * [product]
   * The canonical product URL
   */
  canonical_url?: ?$ElementType<Scalars, 'AbsoluteUrl'>,
  /**
   * [product]
   * The categories the product is assigned to
   */
  categories?: ?Array<?Category>,
  /**
   * [product]
   * Timestamp indicating when the product was created
   */
  created_at?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product]
   * Detailed information about the product. The value can include simple HTML tags
   */
  description?: ?$ElementType<Scalars, 'EscapedString'>,
  /**
   * [product][BAT]
   * Design attributes. Use for adding additional data for product
   */
  design_attributes?: ?Array<?DesignAttribute>,
  /**
   * [product]
   * Images used on Detail Page in gallery module
   */
  gallery_images?: ?Array<?Image>,
  /**
   * [product]
   * Videos used on Detail Page in gallery module
   */
  gallery_videos?: ?Array<?Video>,
  /**
   * [product]
   * Gift Card options. Only for type GIFTCARD
   */
  gift_attributes?: ?GiftAttributes,
  /**
   * [general]
   * The ID assigned to the product
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product]
   * The default Qty can be set by admin, could be used for products, which are included
   * in Grouped product
   */
  initial_qty_group?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [product]
   * Inventory, related to the product
   */
  inventory?: ?Inventory,
  /**
   * [product]
   * A brief overview of the product for search results listings, maximum 255 characters
   */
  meta_description?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [product]
   * A comma-separated list of keywords that are visible only to search engines
   */
  meta_keywords?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [product][BAT]
   * Meta Robots tags
   */
  meta_robots?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product]
   * A string that is displayed in the title bar and tab of the browser and in search results lists
   */
  meta_title?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [product]
   * The product name. Customers use this name to identify the product
   */
  name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [product]
   * A ProductPrice object, indicating the price of an item
   */
  price?: ?ProductPrice,
  /**
   * [product]
   * Whether a price of an 'EDITABLE_BUNDLE' product is dynamic.
   * It means that final price of a bundle depends on options that user selected.
   */
  price_is_dynamic?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [product]
   * The attributes assigned to the product, these data should be displayed in 'more information' section
   */
  product_attributes?: ?Array<?ProductAttribute>,
  /**
   * [product]
   * The main image of the product
   */
  product_image?: ?Image,
  /**
   * [product]
   * Set of simple products that are included in grouped product. Only for type GROUPED
   */
  product_set?: ?Array<?Product>,
  /**
   * [product][BAT]
   * Personalisable product back image
   */
  psn_background_image?: ?Image,
  /**
   * [product][BAT]
   * Personalisable product front image
   */
  psn_front_image?: ?Image,
  /**
   * [product][BAT]
   * Coordinates where image should be painted on the device
   */
  psn_image_coordinates?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product][BAT]
   * Flag indicates if product is personalisable
   */
  psn_is_personalisable?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [product][BAT]
   * Coordinates where text should be painted on the device
   */
  psn_text_coordinates?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product]
   * Loads list of recommended products
   */
  recommended_products_list?: ?Array<?Product>,
  /**
   * [review]
   * The list of reviews assigned to the product
   */
  reviews?: ?ReviewSearch,
  /**
   * [product][BAT]
   * Rule ID
   */
  rule_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product]
   * A short description of the product
   */
  short_description?: ?$ElementType<Scalars, 'EscapedString'>,
  /**
   * [product]
   * A number or code assigned to a product to identify the product, options, price, and manufacturer
   */
  sku?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product]
   * The main image on the product list page
   */
  small_image?: ?Image,
  /**
   * [product]
   * Swatch image of the product
   */
  swatch_image?: ?Image,
  /**
   * [product]
   * The thumbnail image of the product, used on crosssail, related products and checkout
   */
  thumbnail_image?: ?Image,
  /**
   * [product]
   * Identifies, which properties Product instance can contain
   */
  type?: ?ProductType,
  /**
   * [product]
   * Timestamp indicating when the product was updated
   */
  updated_at?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product][BAT]
   * List of up-sell products
   */
  upsell_products_list?: ?Array<?Product>,
  /**
   * [product]
   * Product URL, used to set in browser location
   */
  url?: ?$ElementType<Scalars, 'RelativeUrl'>,
  /**
   * [product]
   * Defines url, that this product should resolve to
   */
  url_rewrite?: ?EntityUrl,
  /**
   * [product]
   * Concret variation of product. Only for type CONFIGURABLE
   */
  variation?: ?Product,
  /**
   * [product]
   * Product variation information. Only for type CONFIGURABLE and its variations
   */
  variation_attributes?: ?Array<?VariationAttribute>,
  /**
   * [product]
   * Product Variations based on variation_attributes selection. Only for type CONFIGURABLE
   */
  variations?: ?Array<?Variation>,
  /**
   * [product]
   * The Qty can be set by user, could be used for products in Wishlist,
   * which are included in Grouped product
   */
  wishlist_qty_group?: ?$ElementType<Scalars, 'Float'>,
|};


/**
 * [general]
 * Product contains attributes that are common to all types of products
 */
export type ProductBundle_SumArgs = {|
  options?: ?Array<?BundleOptionInput>,
|};


/**
 * [general]
 * Product contains attributes that are common to all types of products
 */
export type ProductReviewsArgs = {|
  start: $ElementType<Scalars, 'Int'>,
  count: $ElementType<Scalars, 'Int'>,
|};


/**
 * [general]
 * Product contains attributes that are common to all types of products
 */
export type ProductVariationArgs = {|
  variation_values?: ?Array<?VariationValueInput>,
|};

/**
 * [product]
 * ProductAttribute contains product information, that can be dynamically edited by merchant
 */
export type ProductAttribute = {|
  __typename?: 'ProductAttribute',
  /**
   * [product]
   * The attribute description, detailed information about the attribute
   */
  description?: ?$ElementType<Scalars, 'EscapedString'>,
  /**
   * [product][BAT]
   * Flag uses for hidding attribute on storefront
   */
  is_not_visible_on_storefront?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [product]
   * The attribute name, user friendly title of the attribute
   */
  name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [product][BAT]
   * Option value uses for dropdowns intead value for datalayer
   */
  option_value?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product]
   * The unique identifier for a ProductAttribute
   */
  product_attribute_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product]
   * The data type of the attribute, used to select ui component variant
   */
  type?: ?ProductAttributeType,
  /**
   * [product][BAT]
   * Flag uses for adding data of atrribute to datalayer
   */
  use_in_google_analytics?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [product]
   * Attribute dispay value. Can be text, html or image url depending on 'type' prop
   */
  value?: ?$ElementType<Scalars, 'String'>,
|};

export const ProductAttributeTypeValues = Object.freeze({
  /**
   * [product]
   * Should be rendered as escaped string
   */
  TEXT: 'TEXT',
  /**
   * [product]
   * Should be displayed as injected html (no escaping is performed)
   */
  HTML: 'HTML',
  /**
   * [product]
   * ProductAttribute.value should be image url, displayed correspondingly
   */
  IMAGE: 'IMAGE'
});


/**
 * [product]
 * Product Attribute type is used to define how Attribute will be displayed in Application
 */
export type ProductAttributeType = $Values<typeof ProductAttributeTypeValues>;

/**
 * [product]
 * The Price object defines the price of a product as well as any tax-related adjustments.
 */
export type ProductPrice = {|
  __typename?: 'ProductPrice',
  /**
   * [product]
   * The base price of a product
   */
  regular?: ?Price,
  /**
   * [product]
   * The lowest possible final price for all the variation attributes defined within a configurable product
   */
  minimum?: ?Price,
  /**
   * [product]
   * The highest possible final price of a product. Applicable for EDITABLE_BUNDLE
   */
  maximum?: ?Price,
  /**
   * [product]
   * The final price for exact variation of attributes defined within product
   */
  final?: ?Price,
  /**
   * [product]
   * The lowest possible gift card price
   */
  gift_card_from?: ?Price,
|};

/**
 * [catalog]
 * The Product search object is the top-level object returned in a product search
 */
export type ProductSearch = {|
  __typename?: 'ProductSearch',
  /**
   * [catalog]
   * Offset of returned data for particular product search
   */
  start?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [catalog]
   * The number of products returned
   */
  count?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [catalog]
   * Total number of products matching specified criteria
   */
  total?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [catalog]
   * An array of products that match the specified search criteria
   */
  items?: ?Array<?Product>,
  /**
   * [catalog]
   * Filters array for layered navigation
   */
  filters?: ?Array<?Filter>,
  /**
   * [catalog]
   * Applied filters array
   */
  applied_filters?: ?Array<?Filter>,
  /**
   * [catalog]
   * Sorting options array for layered navigation
   */
  sorts?: ?Array<?Sort>,
  /**
   * [catalog]
   * Applied Sorting option
   */
  applied_sort?: ?Sort,
|};

export const ProductTypeValues = Object.freeze({
  /**
   * [product]
   * SIMPLE product can not be configured or contain bundled items. Can be part of the BUNDLE and GROUPED
   */
  SIMPLE: 'SIMPLE',
  /**
   * [product]
   * CONFIGURABLE product can contain 'variation_attributes' and 'variations' props
   */
  CONFIGURABLE: 'CONFIGURABLE',
  /**
   * [product]
   * BUNDLE can contain 'bundled_products'.
   * Products inside it have preselected quantity. Variation products have preselected values.
   * Neither of that can be changed by a user.
   */
  BUNDLE: 'BUNDLE',
  /**
   * [product]
   * BUNDLE can contain 'bundled_products'.
   * Simple products inside such bundle can be choosen, their quantity can be changed, if allowed in admin panel.
   */
  EDITABLE_BUNDLE: 'EDITABLE_BUNDLE',
  /**
   * [product]
   * Gift Card product
   */
  GIFTCARD: 'GIFTCARD',
  /**
   * [product]
   * GROUPED product can contain a 'product_set' which consists of set of simple products
   */
  GROUPED: 'GROUPED'
});


/**
 * [product]
 * Product type is used to identify, what type specific properties product can contain
 * Each Product can be only have one type
 */
export type ProductType = $Values<typeof ProductTypeValues>;

/** The PushSubscription interface of the Push API provides a subcription's URL endpoint and allows unsubscription from a push service. */
export type PushSubscription = {|
  __typename?: 'PushSubscription',
  /**
   * [push-notification]
   * Firebase token associated with the push subscription.
   */
  firebase_token?: ?$ElementType<Scalars, 'String'>,
  /**
   * [push-notification]
   * Device token associated with the push subscription (safari only).
   */
  device_token?: ?$ElementType<Scalars, 'String'>,
  /**
   * [push-notification]
   * True if push notifications are enabled
   */
  enabled?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [push-notification]
   * Types of subscriptions that user subscribed on
   */
  categories?: ?Array<?SubscriptionCategory>,
|};

/** The PushSubscription interface of the Push API provides a subcription's URL endpoint and allows unsubscription from a push service. */
export type PushSubscriptionInput = {|
  /**
   * [push-notification]
   * Firebase token associated with the push subscription.
   */
  firebase_token?: ?$ElementType<Scalars, 'String'>,
  /**
   * [push-notification]
   * Device token associated with the push subscription (safari only).
   */
  device_token?: ?$ElementType<Scalars, 'String'>,
|};

export const PushSubscriptionTypeEnumValues = Object.freeze({
  /**
   * [push-notification]
   * Push notifications about delivery updates
   */
  DELIVERY_UPDATES: 'DELIVERY_UPDATES',
  /**
   * [push-notification]
   * Push notifications about discounts and sales
   */
  DISCOUNTS_AND_SALES: 'DISCOUNTS_AND_SALES'
});


/**
 * [push-notification]
 * Types of subscriptions
 */
export type PushSubscriptionTypeEnum = $Values<typeof PushSubscriptionTypeEnumValues>;

/** [general] */
export type Query = {|
  __typename?: 'Query',
  /**
   * [store-locator][BAT]
   * Get store locations list
   */
  StoreLocations?: ?Array<?StoreLocation>,
  /**
   * [blog][BAT]
   * Returns blog post object that was found by ID
   */
  blogPost?: ?BlogPost,
  /**
   * [blog][BAT]
   * The posts query searches for posts that match the criteria specified in the search and filter attributes
   */
  blogPosts?: ?BlogPostsOutput,
  /**
   * [quote]
   * Returns information about shopping cart
   */
  cart?: ?Cart,
  /**
   * [widget]
   * Loads required CatalogProductList data by widget instance ID
   */
  catalogProductList?: ?CatalogProductList,
  /**
   * [catalog]
   * Loads Category List for list of ids provided
   */
  categories?: ?Array<?Category>,
  /**
   * [catalog]
   * Loads single category (is preferable method for nesting, when you need to load concrete number of levels)
   */
  category?: ?Category,
  categorySearch?: ?CategorySearch,
  /**
   * [checkout-com][BAT]
   * Request to retrieve configuration for Checkout.com iframe
   */
  checkoutComCardPayment?: ?CheckoutComConfig,
  /**
   * [quote][BAT]
   * Client checkout data
   */
  purchase?: ?ClientPurchase,
  /**
   * [quote]
   * Find a checkout order by token
   */
  checkoutOrder?: ?CheckoutOrder,
  /**
   * [common][BAT]
   * Returns a list of Pakistan city distributors
   */
  cityDistributors?: ?Array<?CityDistributor>,
  /**
   * [cms]
   * returns cms block list for block_identifier list passed
   */
  cmsBlocks?: ?Array<?CmsBlock>,
  /**
   * [cms]
   * returns cms page data by CmsPage id
   */
  cmsPage?: ?CmsPage,
  /**
   * [general]
   * Provides information for all countries.
   */
  countries?: ?Array<?Country>,
  /**
   * [espay][BAT]
   * request to retrieve configuration for Espay iframe
   */
  espay?: ?EspayConfig,
  /**
   * [espay][BAT]
   * request to retrieve available payment chanel list
   */
  espayPaymentInfo?: ?Array<?EspayPaymentItem>,
  /**
   * [restrict-access][BAT]
   * Extract dob from national ID (KTP ID)
   */
  extractDobFromNationalId?: ?Dob,
  /**
   * [sales][BAT]
   * Get customer affiliate program dashboard
   */
  getCustomerAffiliateProgramDashboard?: ?Array<?CustomerAffiliateProgramDashboard>,
  /**
   * [product][BAT]
   * Returns device engraving options
   */
  getDeviceEngravingOptions?: ?EngraveOptions,
  /**
   * [restrict-access][BAT]
   * Returns documents used for upload
   */
  getDocumentTypes?: ?Array<?DocumentTypes>,
  /**
   * [free-gift][BAT]
   * Get free gift rules
   */
  getFreeGiftRules?: ?Array<?FreeGiftItems>,
  /**
   * [sales][BAT]
   * Get customer affiliate program referral url
   */
  getReferralUrl?: ?ReferralUrl,
  /**
   * [sales][BAT]
   * Get customer affiliate program referrals data
   */
  getReferrals?: ?Referrals,
  /**
   * [quote][BAT]
   * Returns reward points settings
   */
  getRewardsPointSettings?: ?RewardPointSettings,
  /**
   * [sales][BAT]
   * Get transactions
   */
  getTransactions?: ?Transactions,
  /**
   * [sales][BAT]
   * Get wallet rules with coupons
   */
  getWalletRulesWithCoupons?: ?Array<?WalletRulesWithCoupons>,
  /**
   * [gift-card]
   * Provides information about gift card.
   */
  giftCard?: ?GiftCard,
  /**
   * [free-gift][BAT]
   * Get flag for showing popup with free gift items
   */
  isCanShowFreeGiftPopup?: ?IsCanShowFreeGiftPopup,
  /**
   * [user]
   * Check information about reset token expiration
   */
  isPasswordResetTokenValid?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [user]
   * Check information about user email availability
   */
  isUserEmailAvailable?: ?UserEmail,
  /** Checks if the user is already subscribed */
  isUserSubscribed?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [catalog]
   * Loads tree of categories for display in menu as plain array (not recommended to use nesting in Category.categories) due to heavy load
   */
  menuCategories?: ?Array<?Category>,
  /**
   * [catalog][BAT]
   * Returns set of menu items
   */
  menuItemsByCode?: ?Array<?MenuItem>,
  /**
   * [catalog]
   * Loads tree of categories for display in menu as plain array (not recommended to use nesting in Category.categories) due to heavy load
   */
  menu_categories?: ?Array<?Category>,
  /**
   * [newsletter]
   * Returns information about users who were subscribed on the newsletter
   */
  newsletters?: ?NewsletterInfo,
  /**
   * [common][BAT]
   * Returns a list of Pakistan cities
   */
  pk_cities?: ?Array<?PakistanCity>,
  /**
   * [catalog]
   * Loads single product instance
   */
  product?: ?Product,
  /**
   * [catalog]
   * Loads products and filter navigation for the list
   */
  productSearch?: ?ProductSearch,
  /**
   * [catalog]
   * Loads products and filter navigation for the list
   */
  productSearch?: ?ProductSearch,
  /**
   * [catalog]
   * Loads list of products by ids
   */
  products?: ?Array<?Product>,
  /** Return information about user's subscriptions on push notifications */
  pushSubscriptionDetails?: ?PushSubscription,
  /**
   * [product]
   * Client query. Array IDs of recently viewed products
   */
  recentViewedProducts?: ?Array<?$ElementType<Scalars, 'ID'>>,
  /**
   * [catalog]
   * Client query. Recent searches
   */
  resentSearches?: ?Array<?$ElementType<Scalars, 'String'>>,
  /**
   * [user][BAT]
   * Loads information about enabled social login providers.
   */
  socialProviders?: ?Array<?SocialLoginProvider>,
  /**
   * [common]
   * Returns store specific configurations, settings and parameters
   */
  storeConfig?: ?StoreConfig,
  /**
   * [multistore]
   * Returns List of store switcher entities
   */
  storeSwitcher?: ?Array<?StoreSwitcherEntity>,
  /**
   * [multistore]
   * Returns List of store entities to identify what store is currently being served.
   * Should return list of all stores for base data_uri, passed with compilation through ENV variables
   */
  stores?: ?Array<?StoreEntity>,
  /**
   * [url-resolver][BAT]
   * returns Object defining Entity (Category, Product, CMS page) that matches with url passed as param
   */
  urlResolver?: ?EntityUrl,
  /**
   * [url-resolver][BAT]
   * returns Object defining list of Entities (Category, Product, CMS page) that match with urls passed as param
   */
  urlResolvers?: ?Array<?EntityUrl>,
  /**
   * [general]
   * Server version of queries set
   */
  version?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * Loads information about current user.
   * Requres authorization.
   */
  viewer?: ?Viewer,
|};


/** [general] */
export type QueryBlogPostArgs = {|
  id?: ?$ElementType<Scalars, 'String'>,
|};


/** [general] */
export type QueryBlogPostsArgs = {|
  filter?: ?BlogPostsFilterInput,
  pageSize: $ElementType<Scalars, 'Int'>,
  currentPage: $ElementType<Scalars, 'Int'>,
  sort?: ?Array<?$ElementType<Scalars, 'String'>>,
  sortFiled: $ElementType<Scalars, 'String'>,
  allPosts?: ?$ElementType<Scalars, 'Boolean'>,
|};


/** [general] */
export type QueryCartArgs = {|
  cart_id?: ?$ElementType<Scalars, 'ID'>,
|};


/** [general] */
export type QueryCatalogProductListArgs = {|
  id: $ElementType<Scalars, 'ID'>,
|};


/** [general] */
export type QueryCategoriesArgs = {|
  ids?: ?Array<?$ElementType<Scalars, 'ID'>>,
|};


/** [general] */
export type QueryCategoryArgs = {|
  id: $ElementType<Scalars, 'ID'>,
|};


/** [general] */
export type QueryCategorySearchArgs = {|
  search: $ElementType<Scalars, 'String'>,
  start: $ElementType<Scalars, 'Int'>,
  count: $ElementType<Scalars, 'Int'>,
|};


/** [general] */
export type QueryCheckoutOrderArgs = {|
  token?: ?$ElementType<Scalars, 'String'>,
|};


/** [general] */
export type QueryCityDistributorsArgs = {|
  regionId?: ?$ElementType<Scalars, 'ID'>,
|};


/** [general] */
export type QueryCmsBlocksArgs = {|
  ids?: ?Array<$ElementType<Scalars, 'ID'>>,
|};


/** [general] */
export type QueryCmsPageArgs = {|
  id: $ElementType<Scalars, 'ID'>,
|};


/** [general] */
export type QueryEspayArgs = {|
  input?: ?EspayPaymentMethodInput,
|};


/** [general] */
export type QueryExtractDobFromNationalIdArgs = {|
  national_id?: ?$ElementType<Scalars, 'String'>,
|};


/** [general] */
export type QueryGetFreeGiftRulesArgs = {|
  cart_id?: ?$ElementType<Scalars, 'ID'>,
|};


/** [general] */
export type QueryGetReferralsArgs = {|
  input?: ?ReferralsInput,
|};


/** [general] */
export type QueryGetRewardsPointSettingsArgs = {|
  input?: ?RewardsSettingInput,
|};


/** [general] */
export type QueryGetTransactionsArgs = {|
  input?: ?TransactionsInput,
|};


/** [general] */
export type QueryGiftCardArgs = {|
  code?: ?$ElementType<Scalars, 'String'>,
  pin?: ?$ElementType<Scalars, 'String'>,
|};


/** [general] */
export type QueryIsCanShowFreeGiftPopupArgs = {|
  cart_id?: ?$ElementType<Scalars, 'ID'>,
|};


/** [general] */
export type QueryIsPasswordResetTokenValidArgs = {|
  token?: ?$ElementType<Scalars, 'String'>,
|};


/** [general] */
export type QueryIsUserEmailAvailableArgs = {|
  email?: ?$ElementType<Scalars, 'String'>,
|};


/** [general] */
export type QueryIsUserSubscribedArgs = {|
  input?: ?PushSubscriptionInput,
|};


/** [general] */
export type QueryMenuCategoriesArgs = {|
  id: $ElementType<Scalars, 'ID'>,
|};


/** [general] */
export type QueryMenuItemsByCodeArgs = {|
  menu_set_code: $ElementType<Scalars, 'String'>,
  is_logged_in?: ?$ElementType<Scalars, 'Boolean'>,
|};


/** [general] */
export type QueryMenu_CategoriesArgs = {|
  id: $ElementType<Scalars, 'ID'>,
|};


/** [general] */
export type QueryNewslettersArgs = {|
  email?: ?$ElementType<Scalars, 'String'>,
|};


/** [general] */
export type QueryPk_CitiesArgs = {|
  regionId: $ElementType<Scalars, 'ID'>,
|};


/** [general] */
export type QueryProductArgs = {|
  id?: ?$ElementType<Scalars, 'ID'>,
|};


/** [general] */
export type QueryProductSearchArgs = {|
  search: $ElementType<Scalars, 'String'>,
  start: $ElementType<Scalars, 'Int'>,
  count: $ElementType<Scalars, 'Int'>,
  filters?: ?Array<?FilterInput>,
  sort?: ?SortInput,
|};


/** [general] */
export type QueryProduct_SearchArgs = {|
  search: $ElementType<Scalars, 'String'>,
  start: $ElementType<Scalars, 'Int'>,
  count: $ElementType<Scalars, 'Int'>,
  filters?: ?Array<?FilterInput>,
  sort?: ?SortInput,
|};


/** [general] */
export type QueryProductsArgs = {|
  ids?: ?Array<?$ElementType<Scalars, 'ID'>>,
|};


/** [general] */
export type QueryPushSubscriptionDetailsArgs = {|
  input?: ?PushSubscriptionInput,
|};


/** [general] */
export type QuerySocialProvidersArgs = {|
  order_ids?: ?Array<?$ElementType<Scalars, 'ID'>>,
  page_type?: ?SocialLoginPageTypeEnum,
|};


/** [general] */
export type QueryUrlResolverArgs = {|
  url: $ElementType<Scalars, 'String'>,
|};


/** [general] */
export type QueryUrlResolversArgs = {|
  urls?: ?Array<?$ElementType<Scalars, 'String'>>,
|};

export type RecaptchaConfig = {|
  __typename?: 'RecaptchaConfig',
  /**
   * [user][BAT]
   * Flag, which indicates that Recaptcha is enabled
   */
  enabled?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [user][BAT]
   * The API client key
   */
  public_key?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user][BAT]
   * The theme of the widget {light | dark}
   */
  theme?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user][BAT]
   * Language code allows the captcha to be used from different languages
   */
  lang?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user][BAT]
   * This allows to change the size or do invisible {compact | normal | invisible}
   */
  size?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [sales][VELO]
 * Referral code
 */
export type ReferralCode = {|
  __typename?: 'ReferralCode',
  /**
   * [sales][VELO]
   * Referral code
   */
  referral_code?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [sales][VELO]
 * Provides affiliate program referral url
 */
export type ReferralUrl = {|
  __typename?: 'ReferralUrl',
  /**
   * [sales][VELO]
   * Referral url
   */
  referral_url?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [sales][VELO]
 * Provides affiliate program referrals data
 */
export type Referrals = {|
  __typename?: 'Referrals',
  /**
   * [sales][VELO]
   * Specifies the offset of results to return
   */
  start?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [sales][VELO]
   * Specifies the maximum number of results to return at once
   */
  count?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [sales][VELO]
   * The number of referrals
   */
  total?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [sales][VELO]
   * Referrals items data
   */
  items?: ?Array<?ReferralsItems>,
|};

export type ReferralsInput = {|
  /**
   * [sales][BAT]
   * Offset of returned data for particular return search
   */
  start?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [sales][BAT]
   * The number of returns returned
   */
  count?: ?$ElementType<Scalars, 'Int'>,
|};

/**
 * [sales][VELO]
 * Provides affiliate program referrals data items
 */
export type ReferralsItems = {|
  __typename?: 'ReferralsItems',
  name?: ?$ElementType<Scalars, 'String'>,
  email?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [sales]
 * Provides order refund information
 */
export type Refund = {|
  __typename?: 'Refund',
  /**
   * [sales]
   * Refund ID
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [sales]
   * Timestamp indicating when the refund was created
   */
  created_at?: ?$ElementType<Scalars, 'String'>,
  /**
   * [sales]
   * Refund status
   */
  status?: ?RefundStatus,
  /**
   * [sales]
   * Refund items
   */
  items?: ?Array<?OrderItem>,
  /**
   * [sales]
   * Subtotal, taxes, discounts, grand total, etc
   */
  prices?: ?OrderPrices,
|};

/**
 * [sales]
 * Provides refund status information
 */
export type RefundStatus = {|
  __typename?: 'RefundStatus',
  /**
   * [sales]
   * Status code
   */
  code?: ?RefundStatusEnum,
  /**
   * [sales]
   * Status name
   */
  name?: ?$ElementType<Scalars, 'String'>,
|};

export const RefundStatusEnumValues = Object.freeze({
  /**
   * [sales]
   * Open
   */
  OPEN: 'OPEN',
  /**
   * [sales]
   * Canceled
   */
  CANCELED: 'CANCELED',
  /**
   * [sales]
   * Refunded
   */
  REFUNDED: 'REFUNDED'
});


/**
 * [sales]
 * Refund status codes
 */
export type RefundStatusEnum = $Values<typeof RefundStatusEnumValues>;

export type Region = {|
  __typename?: 'Region',
  /**
   * [common][BAT]
   * List of Cities
   */
  cities?: ?Array<?City>,
  /**
   * [general]
   * Two letter abbreviation of region
   */
  code?: ?$ElementType<Scalars, 'String'>,
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [general]
   * Region name
   */
  name?: ?$ElementType<Scalars, 'String'>,
|};

export type RegisterInput = {|
  /**
   * [user][BAT]
   * Url, where user should be redirected after confirming the account. It should look like '/account' or '/checkout'
   */
  back_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user][BAT]
   * Consent
   */
  consent?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [user]
   * Date of Birth
   */
  dob?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * Email for user register
   */
  email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * User first name
   */
  first_name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * Gender
   */
  gender?: ?GenderEnum,
  /**
   * [user][BAT]
   * Indicates if it's a registration using social network
   */
  is_social_register?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [user][BAT]
   * User KTP ID
   */
  ktp_id?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * User last name
   */
  last_name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * List of order IDs to assign created guest order(s) to new user
   */
  order_ids?: ?Array<?$ElementType<Scalars, 'ID'>>,
  /**
   * [user]
   * Password String
   */
  password?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * Phone number
   */
  phone_number?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user][BAT]
   * Terms and Condition
   */
  terms_conditions?: ?$ElementType<Scalars, 'Boolean'>,
|};


/**
 * [quote]
 * Input is used as an argument for 'removeBillingAddressOnCart' mutation
 */
export type RemoveBillingAddressOnCartInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
|};

/**
 * [quote]
 * Input is used as an argument for 'removeCouponFromCart' mutation
 */
export type RemoveCouponFromCartInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Coupon code
   */
  code?: ?$ElementType<Scalars, 'String'>,
|};

export type RemoveCustomerNoteFromCartInput = {|
  /**
   * [quote][BAT]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote][BAT]
   * Customer Note
   */
  code?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [quote]
 * Input is used as an argument for 'removeGiftCardFromCart' mutation
 */
export type RemoveGiftCardFromCartInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Gift card code
   */
  code?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [wishlist]
 * Input is used as an argument for 'removeItemFromWishlist' mutation
 */
export type RemoveItemFromWishlistInput = {|
  /**
   * [wishlist]
   * Wishlist item ID
   */
  item_id?: ?$ElementType<Scalars, 'ID'>,
|};

/**
 * [quote][BAT]
 * Input is used as an argument for removing reward points from cart
 */
export type RemovePointsFromCartInput = {|
  /**
   * [quote][BAT]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
|};

/**
 * [quote][BAT]
 * Input is used as an argument for removing referral code from cart
 */
export type RemoveReferralCodeFromCartInput = {|
  /**
   * [quote][BAT]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
|};

/**
 * [sales]
 * Input is used as an argument for 'Reorder' mutation
 */
export type ReorderInput = {|
  /**
   * [sales]
   * Order ID
   */
  order_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [sales]
   * cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
|};

export type RequestResetPasswordInput = {|
  /**
   * [user]
   * User Email to reset password
   */
  email?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [review]
 * Provides review information.
 */
export type Review = {|
  __typename?: 'Review',
  /**
   * [review]
   * The ID assigned to the review
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [review]
   * Author of the review
   */
  author?: ?$ElementType<Scalars, 'String'>,
  /**
   * [review]
   * Timestamp indicating when the review was posted
   */
  posted_at?: ?$ElementType<Scalars, 'String'>,
  /**
   * [review]
   * Review title
   */
  title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [review]
   * Review contents
   */
  details?: ?$ElementType<Scalars, 'String'>,
  /**
   * [review]
   * Review ratings
   */
  ratings?: ?Array<?ReviewRating>,
|};

/**
 * [review]
 * Provides review rating information.
 */
export type ReviewRating = {|
  __typename?: 'ReviewRating',
  /**
   * [review]
   * Rating ID
   */
  rating_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [review]
   * Rating title
   */
  title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [review]
   * Rating value
   */
  value?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [review]
   * Rating percentage value
   */
  percent?: ?$ElementType<Scalars, 'Int'>,
|};

/**
 * [review]
 * Input is used as a part for 'AddReviewInput' input
 */
export type ReviewRatingInput = {|
  /**
   * [review]
   * Rating ID
   */
  rating_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [review]
   * Rating value
   */
  value?: ?$ElementType<Scalars, 'Float'>,
|};

/**
 * [review]
 * Provides review summary data.
 */
export type ReviewRatingSummary = {|
  __typename?: 'ReviewRatingSummary',
  /**
   * [review]
   * Rating summary value
   */
  value?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [review]
   * Rating summary percentage value
   */
  percent?: ?$ElementType<Scalars, 'Int'>,
|};

/**
 * [review]
 * Provides review search data.
 */
export type ReviewSearch = {|
  __typename?: 'ReviewSearch',
  /**
   * [review]
   * Offset of returned data for particular review search
   */
  start?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [review]
   * The number of review items returned
   */
  count?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [review]
   * Total number of review items matching specified criteria
   */
  total?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [review]
   * Review summary
   */
  summary?: ?ReviewRatingSummary,
  /**
   * [review]
   * Review ratings list
   */
  ratings?: ?Array<?ReviewRating>,
  /**
   * [review]
   * An array of review items that match the specified search criteria. Sorted from latest to oldest.
   */
  items?: ?Array<?Review>,
|};

/**
 * [quote][BAT]
 * Reward points discount amount
 */
export type RewardDiscount = {|
  __typename?: 'RewardDiscount',
  /**
   * [quote][BAT]
   * Amount of a discount using reward points
   */
  amount?: ?Money,
|};

/**
 * [quote][BAT]
 * Reward points settings
 */
export type RewardPointSettings = {|
  __typename?: 'RewardPointSettings',
  /**
   * [quote][BAT]
   * Minimum amount of reward points the user could spend
   */
  min_spend_points?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [quote][BAT]
   * Maximum amount of reward points the user could spend
   */
  max_spend_points?: ?$ElementType<Scalars, 'Int'>,
|};

/**
 * [quote][BAT]
 * Reward points amount
 */
export type RewardPoints = {|
  __typename?: 'RewardPoints',
  /**
   * [quote][BAT]
   * Amount of reward points
   */
  points?: ?$ElementType<Scalars, 'Int'>,
|};

/**
 * [sales][VELO]
 * Reward points discount amount
 */
export type RewardsDiscount = {|
  __typename?: 'RewardsDiscount',
  /**
   * [sales][VELO]
   * Amount of a discount using reward points
   */
  amount?: ?Money,
  /**
   * [sales][VELO]
   * Amount of a spent reward points
   */
  points_spent?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [sales][VELO]
   * Amount of a earned reward points
   */
  points_earn?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [sales][VELO]
   * Indicates if earned points are still pending. Could be 'pending' or null
   */
  points_earn_flag?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [quote][BAT]
 * Input is used as an argument to query reward points settings
 */
export type RewardsSettingInput = {|
  /**
   * [quote][BAT]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
|};

/**
 * [quote]
 * Input is used as an argument for 'savePaymentMethod' mutation
 */
export type SavePaymentMethodInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Flag that responsible for the need to add selected payment method to saved methods
   */
  should_be_saved?: ?$ElementType<Scalars, 'Boolean'>,
|};

export type SavedPayment = {|
  __typename?: 'SavedPayment',
  /**
   * [user]
   * payment item ID
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [user]
   * payment hash to commit payment transaction
   */
  public_hash?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * payment method code
   */
  code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * payment method type
   */
  type?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * Timestamp indicating when the payment method was created
   */
  created_at?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * Timestamp indicating when the payment method will be expired
   */
  expires_at?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * Payment method additional information
   */
  details?: ?SavedPaymentDetails,
|};

export type SavedPaymentDetails = {|
  __typename?: 'SavedPaymentDetails',
  /**
   * [user]
   * card type
   */
  card_type?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * card number
   */
  card_number?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * card expiry date
   */
  card_expiry_date?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * card holder
   */
  card_holder?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * customer email identifier for PayPal, ApplePay, GooglePay methods
   */
  customer_email?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [product]
 * Information about bundle options that user chose
 */
export type SelectedBundleOption = {|
  __typename?: 'SelectedBundleOption',
  /**
   * [product]
   * Selected bundle option ID
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product]
   * Option label
   */
  label?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [product]
   * Input type of the option
   */
  input_type?: ?BundleInputType,
  /**
   * [product]
   * Product or products that user selected in this option
   */
  values?: ?Array<?SelectedBundleOptionValue>,
|};

/**
 * [product]
 * Product that user chose
 */
export type SelectedBundleOptionValue = {|
  __typename?: 'SelectedBundleOptionValue',
  /**
   * [product]
   * Selected product ID
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product]
   * Product label
   */
  label?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [product]
   * Price of the product
   */
  cost?: ?Money,
  /**
   * [product]
   * Quantity of the product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
|};

/**
 * [quote]
 * Provides selected payment method information in shopping cart
 */
export type SelectedPaymentMethod = {|
  __typename?: 'SelectedPaymentMethod',
  /**
   * [quote]
   * The selected payment method
   */
  payment_method?: ?PaymentMethod,
  /**
   * [quote]
   * Flag that responsible for adding selected payment method to saved payment methods
   */
  should_be_saved?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [quote]
   * Selected saved payment method
   */
  saved_payment_method?: ?SavedPayment,
|};

/**
 * [user][BAT]
 * Input is used as an argument for confirming the account
 */
export type SendConfirmationLinkInput = {|
  /**
   * [user][BAT]
   * Email provided by the user, used for confirming the account
   */
  email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user][BAT]
   * Url, where user will be redirected after confirming the account
   */
  back_url?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [quote]
 * Input is used as an argument for 'setBillingAddressAsShippingAddressOnCart' mutation
 */
export type SetBillingAddressAsShippingAddressOnCartInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
|};

/**
 * [quote]
 * Input is used as an argument for 'setBillingAddressOnCart' mutation
 */
export type SetBillingAddressOnCartInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Billing address
   */
  billing_address?: ?BillingAddressInput,
|};

/**
 * [quote]
 * Input is used as an argument for 'setBillingFromAddressBook' mutation
 */
export type SetBillingFromAddressBookInput = {|
  /**
   * [quote]
   * User's Address ID from Address Book
   */
  address_id?: ?$ElementType<Scalars, 'ID'>,
|};

export type SetDefaultBillingAddressInput = {|
  /**
   * [account]
   * Customer address id
   */
  address_id?: ?$ElementType<Scalars, 'ID'>,
|};

export type SetDefaultShippingAddressInput = {|
  /**
   * [account]
   * Customer address id
   */
  address_id?: ?$ElementType<Scalars, 'ID'>,
|};

/**
 * [quote]
 * Input is used as an argument for 'setGuestEmailOnCart' mutation
 */
export type SetGuestEmailOnCartInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Guest email
   */
  email?: ?$ElementType<Scalars, 'String'>,
|};

export type SetNewPasswordInput = {|
  /**
   * [user]
   * New password
   */
  new_password?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * Reset password token
   */
  reset_token?: ?$ElementType<Scalars, 'String'>,
|};

export type SetNewsletterInput = {|
  /**
   * [newsletter]
   * Customer's email
   */
  email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [newsletter]
   * Set to true if user wants to subscribe on newsletters and set to false - to unsubscribe
   */
  subscribed?: ?$ElementType<Scalars, 'Boolean'>,
|};

/**
 * [quote]
 * Input is used as an argument for 'setPaymentMethodOnCart' mutation
 */
export type SetPaymentMethodOnCartInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Payment method
   */
  payment_method?: ?PaymentMethodInput,
|};

/**
 * [quote]
 * Input is used as an argument for 'setShippingAddressesOnCart' mutation
 */
export type SetShippingAddressesOnCartInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Shipping addresses
   */
  shipping_addresses?: ?Array<?ShippingAddressInput>,
|};

/**
 * [quote]
 * Input is used as an argument for 'setShippingFromAddressBook' mutation
 */
export type SetShippingFromAddressBookInput = {|
  /**
   * [quote]
   * User's Address ID from Address Book
   */
  address_id?: ?$ElementType<Scalars, 'ID'>,
|};

/**
 * [quote]
 * Input is used as an argument for 'setShippingMethodsOnCart' mutation
 */
export type SetShippingMethodsOnCartInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Shipping methods
   */
  shipping_methods?: ?Array<?ShippingMethodInput>,
|};

/**
 * [sales]
 * Provides order shipment information
 */
export type Shipment = {|
  __typename?: 'Shipment',
  /**
   * [sales]
   * Timestamp indicating when the shipment was created
   */
  created_at?: ?$ElementType<Scalars, 'String'>,
  /**
   * [sales]
   * Shipment items
   */
  items?: ?Array<?OrderItem>,
  /**
   * [sales]
   * Shipment ID
   */
  shipment_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [sales]
   * Shipping address. Uses in case when CRM don't allow attach it to order directly otherwise it 'null'.
   */
  shipping_address?: ?Address,
  /**
   * [sales]
   * Shipping method. Uses in case when CRM don't allow attach it to order directly otherwise it 'null'.
   */
  shipping_method?: ?ShippingMethod,
  /**
   * [sales]
   * Shipment status
   */
  status?: ?OrderStatus,
  /**
   * [sales][BAT]
   * Shipment Tracking Number. It's provided by aCommerce via OMS or can be provided manually by admin
   */
  tracking_number?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [quote]
 * Input is used as a part for 'SetShippingAddressesOnCartInput' input
 */
export type ShippingAddressInput = {|
  /**
   * [quote]
   * Shipping address
   */
  address?: ?CartAddressInput,
|};

/**
 * [quote]
 * Provides shipping address information in shopping cart
 */
export type ShippingCartAddress = {|
  __typename?: 'ShippingCartAddress',
  address?: ?Address,
  /**
   * [quote]
   * List of all available shipping methods
   */
  shipping_methods?: ?Array<?ShippingMethod>,
  /**
   * [quote]
   * Selected shipping method
   */
  selected_shipping_method?: ?ShippingMethod,
|};

/**
 * [quote]
 * Provides shipping method information in shopping cart
 */
export type ShippingMethod = {|
  __typename?: 'ShippingMethod',
  /**
   * [quote]
   * True, when shipping method is applicable
   */
  applicable?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [quote]
   * Cost of delivery
   */
  amount?: ?Money,
  /**
   * [quote]
   * Carrier code
   */
  carrier_code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Carrier title
   */
  carrier_title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Method code
   */
  method_code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Method title
   */
  method_title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Error message from back-office in case when shipping method is not applicable
   */
  error_message?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [quote]
 * Input is used as a part for 'SetShippingMethodsOnCartInput' input
 */
export type ShippingMethodInput = {|
  /**
   * [quote]
   * Carrier code
   */
  carrier_code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Method code
   */
  method_code?: ?$ElementType<Scalars, 'String'>,
|};

export type SocialLoginInput = {|
  /**
   * [user]
   * Social provider data
   */
  provider_data?: ?$ElementType<Scalars, 'JSON'>,
|};

export const SocialLoginPageTypeEnumValues = Object.freeze({
  CHECKOUT: 'CHECKOUT'
});


export type SocialLoginPageTypeEnum = $Values<typeof SocialLoginPageTypeEnumValues>;

export type SocialLoginProvider = {|
  __typename?: 'SocialLoginProvider',
  /**
   * [user][BAT]
   * Provider type
   */
  type?: ?SocialLoginProviderEnum,
  /**
   * [user][BAT]
   * Redirect URL of social provider
   */
  url?: ?$ElementType<Scalars, 'String'>,
|};

export const SocialLoginProviderEnumValues = Object.freeze({
  FACEBOOK: 'FACEBOOK',
  GOOGLE: 'GOOGLE'
});


export type SocialLoginProviderEnum = $Values<typeof SocialLoginProviderEnumValues>;

export type SocialProviderConnection = {|
  __typename?: 'SocialProviderConnection',
  /**
   * [user]
   * Provider type
   */
  type?: ?SocialLoginProviderEnum,
  /**
   * [user]
   * User first name of social provider
   */
  first_name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * User last name of social provider
   */
  last_name?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [product]
 * Sorting option defines the values for sorting
 */
export type Sort = {|
  __typename?: 'Sort',
  /**
   * [product]
   * The ID assigned to the sorting option
   */
  sort_option_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product]
   * The sorting option name, user friendly title, can be used as tooltip or part of tooltip
   */
  name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [product]
   * Has true value if it is a default sorting value
   */
  is_default?: ?$ElementType<Scalars, 'Boolean'>,
|};

export const SortDirectionTypeValues = Object.freeze({
  /**
   * [product]
   * Sort descending
   */
  DESC: 'DESC',
  /**
   * [product]
   * Sort Ascending
   */
  ASC: 'ASC'
});


/**
 * [product]
 * Sort Direction type is used to define the order of sorting
 */
export type SortDirectionType = $Values<typeof SortDirectionTypeValues>;

/**
 * [product]
 * Sorting input is used as an argument for 'productSearch' query
 */
export type SortInput = {|
  /**
   * [product]
   * ID of sorting option
   */
  sort_option_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product]
   * Sorting option direction (acs, desc). Should set desc by default.
   */
  direction?: ?SortDirectionType,
|};

export type SpendPoints = {|
  __typename?: 'SpendPoints',
  /**
   * [quote][BAT]
   * Points
   */
  points?: ?$ElementType<Scalars, 'Int'>,
|};

/**
 * [sales][VELO]
 * Spending rule
 */
export type SpendingRule = {|
  __typename?: 'SpendingRule',
  /**
   * [sales][VELO]
   * Sending rule label
   */
  label?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [common]
 * Returns store specific configurations, settings and parameters
 */
export type StoreConfig = {|
  __typename?: 'StoreConfig',
  /**
   * [common][BAT]
   * Add to cart free gift message
   */
  add_freegift_to_cart_message?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common][BAT]
   * Age of majority, which is used during ktp id (national id) validation
   */
  age_of_majority?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [common]
   * Flag that responsible for place order for guest
   */
  allow_guest_checkout?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common]
   * Flag that responsible for enabling a review for the guest user
   */
  allow_guest_review?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common]
   * Flag that responsible for enabling a newsletter subscription for the guest user
   */
  allow_guest_subscription?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * The amount of hours the user will not be able to upload an image for verification. It's needed for HAV via Azure service
   */
  azure_failed_lifetime?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [common][BAT]
   * Amount of attempts, the user could upload an image for verification. It's needed for HAV via Azure service
   */
  azure_failed_limit?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [common][BAT]
   * Store currency symbol
   */
  base_currency_code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common]
   * The main image placeholder on the product page
   */
  base_image_placeholder?: ?Image,
  /**
   * [common][BAT]
   * Flag, responsible for enabling the DotDigital live chat
   */
  chat_enabled?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * Api space needed for DotDigital live chat
   */
  ddg_chat_api_space?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product][BAT]
   * Device Personalisation Max Horizontal Characters
   */
  device_psn_max_characters_horizontal?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [product][BAT]
   * Device Personalisation Max Vertical Characters
   */
  device_psn_max_characters_vertical?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [product][BAT]
   * Device Personalisation PDP Disclaimer
   */
  device_psn_pdp_disclaimer?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product][BAT]
   * Device Personalisation Price
   */
  device_psn_price?: ?Money,
  /**
   * [product][BAT]
   * Device Personalisation Regular Expression
   */
  device_psn_regex?: ?$ElementType<Scalars, 'String'>,
  /**
   * [product][BAT]
   * Device Personalisation Special Price
   */
  device_psn_special_price?: ?Money,
  /**
   * [common]
   * Flag that responsible for enabling the display cookies notice
   */
  enable_cookies_notice?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common]
   * Flag that responsible for enabling google recaptcha feature
   */
  enable_recaptcha?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * Flag, responsible for enabling an autocomplete of user first and last name in contact details
   */
  enable_recipient_autocomplete?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common]
   * Flag that responsible for enabling a review to customer
   */
  enable_review?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common]
   * Flag that responsible for enabling a newsletter subscription to customer
   */
  enable_subscription?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * Facebook media link
   */
  facebook_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common]
   * The absolute URL of the favicon
   */
  favicon_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common][BAT]
   * Free device pickup options list
   */
  free_device_pickup_option?: ?Array<?PickupOption>,
  /**
   * [common][BAT]
   * Free device pickup options label
   */
  free_device_pickup_option_attr_label?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common][BAT]
   * Google optimize container id
   */
  google_opt_container_id?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common][BAT]
   * Flag, responsible for enabling the Google optimize
   */
  google_opt_enabled?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * GTM authorization key
   */
  gtm_authorization_key?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common][BAT]
   * GTM container id
   */
  gtm_container_id?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common][BAT]
   * GTM preview
   */
  gtm_preview?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common][BAT]
   * Flag, which indicates that ktp id validation for guest is enabled
   */
  guest_validate_ktp_id?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common]
   * List of hidden customer attributes (fields) set through the 'Show on Storefront' ('No' value) setting
   */
  hidden_customer_attributes?: ?Array<?$ElementType<Scalars, 'String'>>,
  /**
   * [common][BAT]
   * Category ID for slider 1 on homepage
   */
  homepage_category_for_slider_1?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [common][BAT]
   * Category ID for slider 2 on homepage
   */
  homepage_category_for_slider_2?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [common][BAT]
   * Provides Homepage Meta Information
   */
  homepage_meta?: ?HomepageMeta,
  /**
   * [common][BAT]
   * Instagram media link
   */
  instagram_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common][BAT]
   * Flag, responsible for enabling the HAV via Azure service
   */
  is_azure_enabled?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * Flag, which indicates that blog functionality is enabled
   */
  is_blog_enabled?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [product][BAT]
   * Is enabled Device Personalisation
   */
  is_enabled_device_psn?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * Flag, responsible for enabling the date of birth autocomplete using the ktp id data
   */
  is_enabled_dob_autocomplete?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * Flag, responsible for enabling the GTM
   */
  is_gtm_enabled?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * Flag, responsible for enabling the minicart
   */
  is_minicart_enabled?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * Flag, responsible for enabling the push notifications (push notifications page is hidden in case it's false)
   */
  is_push_notification_enabled?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * Flag, responsible for enabling the referral program features (such as reward points on checkout page, referral link on register page and so on)
   */
  is_referral_program_enabled?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * Flag, responsible for disabling registration logic
   */
  is_registration_disabled?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * Flag, responsible for enabling the tab My Rewards in My Account
   */
  is_show_dashboard_tab_in_my_account?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * Flag, responsible for enabling the tab My Rewards in My Account
   */
  is_show_my_rewards_tab_in_my_account?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * Flag, which indicates that free pick-up for device is enabled
   */
  is_show_offline_pickup_options?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * Flag, responsible for enabling tabs in Referral Program in My Account
   */
  is_show_points_menu?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common]
   * The application locale. Depending on language could be in a format of a 2-symbol code (like 'en') or a 5-symbol code (like 'en-AU' with exactly a hyphen between a language and a region)
   */
  locale?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common]
   * The absolute URL of the website logo
   */
  logo_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common]
   * Maximum quantity of the product allowed in cart
   */
  max_cart_item_qty?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [common][BAT]
   * Meta Robots tags by default for store
   */
  meta_robots?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/advanced_permalink/archive_path_schema
   */
  mfblog_advanced_permalink_archive_path_schema?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/advanced_permalink/blog_route
   */
  mfblog_advanced_permalink_blog_route?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/advanced_permalink/enabled
   */
  mfblog_advanced_permalink_enabled?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/advanced_permalink/redirect_to_no_slash
   */
  mfblog_advanced_permalink_redirect_to_no_slash?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/advanced_permalink/search_path_schema
   */
  mfblog_advanced_permalink_search_path_schema?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/author/enabled
   */
  mfblog_author_enabled?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/author/page_enabled
   */
  mfblog_author_page_enabled?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/author/robots
   */
  mfblog_author_robots?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/design/format_date
   */
  mfblog_design_format_date?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/design/publication_date
   */
  mfblog_design_publication_date?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [common][BAT]
   * Flag, which indicates that blog widget is enabled for a Home Page
   */
  mfblog_homepage_related_posts_enabled?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * A number of posts in a blog widget for a Home Page
   */
  mfblog_homepage_related_posts_number_of_posts?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/index_page/meta_description
   */
  mfblog_index_page_meta_description?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/index_page/meta_keywords
   */
  mfblog_index_page_meta_keywords?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/index_page/meta_title
   */
  mfblog_index_page_meta_title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/index_page/posts_sort_by
   */
  mfblog_index_page_posts_sort_by?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/index_page/title
   */
  mfblog_index_page_title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/permalink/archive_route
   */
  mfblog_permalink_archive_route?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/permalink/author_route
   */
  mfblog_permalink_author_route?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/permalink/author_sufix
   */
  mfblog_permalink_author_sufix?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/permalink/category_route
   */
  mfblog_permalink_category_route?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/permalink/category_sufix
   */
  mfblog_permalink_category_sufix?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/permalink/category_use_categories
   */
  mfblog_permalink_category_use_categories?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/permalink/post_route
   */
  mfblog_permalink_post_route?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/permalink/post_sufix
   */
  mfblog_permalink_post_sufix?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/permalink/post_use_categories
   */
  mfblog_permalink_post_use_categories?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/permalink/redirect_to_no_slash
   */
  mfblog_permalink_redirect_to_no_slash?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/permalink/route
   */
  mfblog_permalink_route?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/permalink/search_route
   */
  mfblog_permalink_search_route?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/permalink/tag_route
   */
  mfblog_permalink_tag_route?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/permalink/tag_sufix
   */
  mfblog_permalink_tag_sufix?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/permalink/type
   */
  mfblog_permalink_type?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/post_list/posts_per_page
   */
  mfblog_post_list_posts_per_page?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/post_view/comments/default_status
   */
  mfblog_post_view_comments_default_status?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/post_view/comments/display_privacy_policy_checkbox
   */
  mfblog_post_view_comments_display_privacy_policy_checkbox?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/post_view/comments/disqus_forum_shortname
   */
  mfblog_post_view_comments_disqus_forum_shortname?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/post_view/comments/fb_app_id
   */
  mfblog_post_view_comments_fb_app_id?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/post_view/comments/fb_app_id_header
   */
  mfblog_post_view_comments_fb_app_id_header?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/post_view/comments/format_date
   */
  mfblog_post_view_comments_format_date?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/post_view/comments/guest_comments
   */
  mfblog_post_view_comments_guest_comments?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/post_view/comments/number_of_comments
   */
  mfblog_post_view_comments_number_of_comments?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/post_view/comments/number_of_replies
   */
  mfblog_post_view_comments_number_of_replies?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/post_view/comments/type
   */
  mfblog_post_view_comments_type?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/post_view/nextprev/enabled
   */
  mfblog_post_view_nextprev_enabled?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/post_view/related_posts/enabled
   */
  mfblog_post_view_related_posts_enabled?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/post_view/related_posts/number_of_posts
   */
  mfblog_post_view_related_posts_number_of_posts?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/post_view/related_products/enabled
   */
  mfblog_post_view_related_products_enabled?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/post_view/related_products/number_of_products
   */
  mfblog_post_view_related_products_number_of_products?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/product_page/number_of_related_posts
   */
  mfblog_product_page_number_of_related_posts?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/product_page/related_posts_enabled
   */
  mfblog_product_page_related_posts_enabled?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/search/robots
   */
  mfblog_search_robots?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/seo/use_canonical_meta_tag_for
   */
  mfblog_seo_use_canonical_meta_tag_for?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/archive/enabled
   */
  mfblog_sidebar_archive_enabled?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/archive/format_date
   */
  mfblog_sidebar_archive_format_date?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/archive/sort_order
   */
  mfblog_sidebar_archive_sort_order?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/categories/enabled
   */
  mfblog_sidebar_categories_enabled?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/categories/max_depth
   */
  mfblog_sidebar_categories_max_depth?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/categories/show_posts_count
   */
  mfblog_sidebar_categories_show_posts_count?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/categories/sort_order
   */
  mfblog_sidebar_categories_sort_order?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/custom2/enabled
   */
  mfblog_sidebar_custom2_enabled?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/custom2/html
   */
  mfblog_sidebar_custom2_html?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/custom2/sort_order
   */
  mfblog_sidebar_custom2_sort_order?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/custom/enabled
   */
  mfblog_sidebar_custom_enabled?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/custom/html
   */
  mfblog_sidebar_custom_html?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/custom/sort_order
   */
  mfblog_sidebar_custom_sort_order?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/featured_posts/enabled
   */
  mfblog_sidebar_featured_posts_enabled?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/featured_posts/posts_ids
   */
  mfblog_sidebar_featured_posts_posts_ids?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/featured_posts/sort_order
   */
  mfblog_sidebar_featured_posts_sort_order?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/popular_posts/enabled
   */
  mfblog_sidebar_popular_posts_enabled?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/popular_posts/posts_per_page
   */
  mfblog_sidebar_popular_posts_posts_per_page?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/popular_posts/sort_order
   */
  mfblog_sidebar_popular_posts_sort_order?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/recent_posts/enabled
   */
  mfblog_sidebar_recent_posts_enabled?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/recent_posts/posts_per_page
   */
  mfblog_sidebar_recent_posts_posts_per_page?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/recent_posts/sort_order
   */
  mfblog_sidebar_recent_posts_sort_ordere?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/rss_feed/description
   */
  mfblog_sidebar_rss_feed_description?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/rss_feed/enabled
   */
  mfblog_sidebar_rss_feed_enabled?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/rss_feed/sort_order
   */
  mfblog_sidebar_rss_feed_sort_order?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/rss_feed/title
   */
  mfblog_sidebar_rss_feed_title?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/search/enabled
   */
  mfblog_sidebar_search_enabled?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/search/sort_order
   */
  mfblog_sidebar_search_sort_order?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/tag_claud/enabled
   */
  mfblog_sidebar_tag_claud_enabled?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/tag_claud/sort_order
   */
  mfblog_sidebar_tag_claud_sort_order?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/sidebar/tag_claud/tag_count
   */
  mfblog_sidebar_tag_claud_tag_count?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * If AddThis social sharing is enabled
   */
  mfblog_social_add_this_enabled?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * AddThis language
   */
  mfblog_social_add_this_language?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * AddThis identifier
   */
  mfblog_social_add_this_pubid?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/tag/robots
   */
  mfblog_tag_robots?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/top_menu/include_categories
   */
  mfblog_top_menu_include_categories?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/top_menu/item_text
   */
  mfblog_top_menu_item_text?: ?$ElementType<Scalars, 'String'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/top_menu/max_depth
   */
  mfblog_top_menu_max_depth?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [blog][BAT]
   * Extended Config Data - mfblog/top_menu/show_item
   */
  mfblog_top_menu_show_item?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [common]
   * Minimum quantity of the product allowed in cart
   */
  min_cart_item_qty?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [common]
   * Store name
   */
  name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common][BAT]
   * Postcode maximum length, used for validation
   */
  postcode_max_length?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [common][BAT]
   * Postcode minimum length, used for validation
   */
  postcode_min_length?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [common][BAT]
   * Config for recaptcha on Contact US Page
   */
  recaptcha_contact?: ?RecaptchaConfig,
  /**
   * [common]
   * Recaptcha sitekey
   */
  recaptcha_sitekey?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common]
   * Recaptcha type
   */
  recaptcha_type?: ?$ElementType<Scalars, 'String'>,
  /**
   * [live-chat][BAT]
   * Salesforce chat button ID
   */
  salesforce_chat_button_id?: ?$ElementType<Scalars, 'String'>,
  /**
   * [live-chat][BAT]
   * Salesforce chat deployment ID
   */
  salesforce_chat_deployment_id?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common][BAT]
   * Flag, which indicates that Salesforce chat is enabled
   */
  salesforce_chat_enabled?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [live-chat][BAT]
   * Salesforce chat endpoint url
   */
  salesforce_chat_endpoint_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [live-chat][BAT]
   * Salesforce chat organization ID
   */
  salesforce_chat_organization_id?: ?$ElementType<Scalars, 'String'>,
  /**
   * [live-chat][BAT]
   * Salesforce chat script url
   */
  salesforce_chat_script_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common][BAT]
   * Search recommendation category ID
   */
  search_recommendation_category_id?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common][BAT]
   * Returns server timestamp (used for Google Analytics)
   */
  server_unix_timestamp?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [common][BAT]
   * Indicator, which is used for applying a particular settings to 'company' field. It could have three values: 'required', 'optional' and null
   */
  show_company?: ?$ElementType<Scalars, 'String'>,
  /**
   * [common][BAT]
   * Flag that responsible for enabling a coupons wallet
   */
  show_coupon_wallet?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * Flag that responsible for show referral program menu item
   */
  show_referral_program_menu?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [store-locator][BAT]
   * Store Locator (Google Map) api key
   */
  sl_api_key?: ?$ElementType<Scalars, 'String'>,
  /**
   * [store-locator][BAT]
   * Flag, which indicates that Store Locator (Google Map) should consist of black and white colors
   */
  sl_blackwhite?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [store-locator][BAT]
   * Store Locator center position (latitude)
   */
  sl_center_lat?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [store-locator][BAT]
   * Store Locator center position (longitude)
   */
  sl_center_lng?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [store-locator][BAT]
   * Store Locator cluster maximum level
   */
  sl_clustering_max_zoom?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [store-locator][BAT]
   * Flag, responsible for zooming on click on Store Locator cluster
   */
  sl_clustering_zoom_on_click?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * Flag, responsible for enabling a store locator functionality
   */
  sl_enabled?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [store-locator][BAT]
   * Store Locator maximum zoom level
   */
  sl_max_zoom?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [store-locator][BAT]
   * Store Locator minimum zoom level
   */
  sl_min_zoom?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [store-locator][BAT]
   * Store Locator zoom level
   */
  sl_zoom?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [common]
   * The image placeholder on the product list page
   */
  small_image_placeholder?: ?Image,
  /**
   * [common][BAT]
   * Amount of 'street' fields
   */
  street_max_lines?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [common]
   * Swatch image placeholder
   */
  swatch_image_placeholder?: ?Image,
  /**
   * [common]
   * The thumbnail image placeholder, used on cart page, related products and thumbnail gallery
   */
  thumbnail_image_placeholder?: ?Image,
  /**
   * [common][BAT]
   * Soft Age Verification lifetime (in hours). After acceptance, the SAV popup will be hidden for this period of time
   */
  verification_lifetime?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [common][BAT]
   * Flag, which indicates that Web to case is enabled
   */
  web_to_case_enabled?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [common][BAT]
   * Youtube media link
   */
  youtube_url?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [store]
 * Information for store code pass configuration and store picker component
 */
export type StoreEntity = {|
  __typename?: 'StoreEntity',
  /**
   * [multistore]
   * Human readable name of the store.
   * Used to display store picker UI component for user
   */
  name?: ?$ElementType<Scalars, 'EscapedString'>,
  /**
   * [multistore]
   * Store code, that will be used as an additional parameter for
   * all graphql queries and mutations but getStores query
   */
  code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [multistore]
   * If information about current store can't be determine from URL, LUFT will take this store as a default
   */
  is_default?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [multistore]
   * Page url is matched against this parameter to detect which store should be used right now.
   * Each base url should consist of host + port + base path (https://sub.domain.com:8080/base/path) and have no trailing slash at the end.
   * The priority for successful match is based on reversed lexicographical order, for instance for base_urls:
   *
   * 1. https://domain.com/en/en
   * 2. https://domain.com/en
   * 3. https://domain.com
   * 4. https://sub.domain.com/en/en
   *
   * first three will be a match for 'https://domain.com/en/en/my-product', but only the first one will
   * be selected according to reversed lexicographical order.
   *
   * !Important note:! For local development host and port are ignored and only base path is used for store identification.
   */
  base_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [multistore]
   * Alternative store based data_uri for Graphql Requests.
   * Will be used instead of default one passed from ENV variables during compilation
   */
  data_uri?: ?$ElementType<Scalars, 'String'>,
|};

export type StoreLocation = {|
  __typename?: 'StoreLocation',
  /**
   * [store-locator][BAT]
   * Store name
   */
  name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [store-locator][BAT]
   * Address line 1
   */
  adr1?: ?$ElementType<Scalars, 'String'>,
  /**
   * [store-locator][BAT]
   * Address line 2
   */
  adr2?: ?$ElementType<Scalars, 'String'>,
  /**
   * [store-locator][BAT]
   * Address line 3
   */
  adr3?: ?$ElementType<Scalars, 'String'>,
  /**
   * [store-locator][BAT]
   * City
   */
  city?: ?$ElementType<Scalars, 'String'>,
  /**
   * [store-locator][BAT]
   * Country code
   */
  country_code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [store-locator][BAT]
   * Custom image
   */
  custom_image?: ?$ElementType<Scalars, 'String'>,
  /**
   * [store-locator][BAT]
   * Custom logo
   */
  custom_logo?: ?$ElementType<Scalars, 'String'>,
  /**
   * [store-locator][BAT]
   * Custom marker
   */
  custom_marker?: ?$ElementType<Scalars, 'String'>,
  /**
   * [store-locator][BAT]
   * Latitude
   */
  latitude?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [store-locator][BAT]
   * Longitude
   */
  longitude?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [store-locator][BAT]
   * Phone number
   */
  phone?: ?$ElementType<Scalars, 'String'>,
  /**
   * [store-locator][BAT]
   * State/Region
   */
  state?: ?$ElementType<Scalars, 'String'>,
  /**
   * [store-locator][BAT]
   * Store location stocks
   */
  stocks?: ?Array<?StoreStock>,
  /**
   * [store-locator][BAT]
   * Zindex
   */
  zindex?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [store-locator][BAT]
   * Zip Code
   */
  zip_code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [store-locator][BAT]
   * Store Type information
   */
  store_type?: ?StoreType,
|};

export type StoreStock = {|
  __typename?: 'StoreStock',
  /**
   * [store-locator][BAT]
   * Category/Stock name
   */
  name?: ?$ElementType<Scalars, 'String'>,
|};

export type StoreSwitcherEntity = {|
  __typename?: 'StoreSwitcherEntity',
  /**
   * [multistore]
   * Human readable name of the store entity.
   */
  name?: ?$ElementType<Scalars, 'EscapedString'>,
  /**
   * [multistore]
   * Base URL should consist of host + port + base path (https://sub.domain.com:8080/base/path)
   * and have no trailing slash at the end.
   */
  base_url?: ?$ElementType<Scalars, 'String'>,
  /**
   * [multistore]
   * True, when user uses the current store entity.
   */
  is_current?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [multistore]
   * Website ID of the store entity.
   */
  website_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [multistore]
   * Website name
   */
  website_name?: ?$ElementType<Scalars, 'String'>,
|};

export type StoreType = {|
  __typename?: 'StoreType',
  /**
   * [store-locator][BAT]
   * Store type name
   */
  store_name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [store-locator][BAT]
   * Store type full logo
   */
  full_logo?: ?$ElementType<Scalars, 'String'>,
  /**
   * [store-locator][BAT]
   * Store type inactive marker logo
   */
  inactive_marker_logo?: ?$ElementType<Scalars, 'String'>,
  /**
   * [store-locator][BAT]
   * Store type active marker logo
   */
  active_marker_logo?: ?$ElementType<Scalars, 'String'>,
|};

/** The SubscriptionCategory interface of the subscription category. */
export type SubscriptionCategory = {|
  __typename?: 'SubscriptionCategory',
  /** Category code */
  category_code?: ?$ElementType<Scalars, 'ID'>,
  /** Name of category */
  name?: ?$ElementType<Scalars, 'String'>,
  /** Is user subscribed for this category */
  is_subscribed?: ?$ElementType<Scalars, 'Boolean'>,
|};

/**
 * [quote]
 * Provides tax information
 */
export type TaxItem = {|
  __typename?: 'TaxItem',
  /**
   * [quote]
   * Tax label
   */
  label?: ?$ElementType<Scalars, 'String'>,
  /**
   * [quote]
   * Tax amount
   */
  amount?: ?Money,
|};

/**
 * [sales][VELO]
 * Tier info
 */
export type TierInfo = {|
  __typename?: 'TierInfo',
  /**
   * [sales][VELO]
   * Tier info label
   */
  label?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [sales][VELO]
 * Transactions items info
 */
export type TransactionItems = {|
  __typename?: 'TransactionItems',
  /**
   * [sales][VELO]
   * Transaction comment
   */
  comment?: ?$ElementType<Scalars, 'String'>,
  /**
   * [sales][VELO]
   * Transaction points
   */
  points?: ?$ElementType<Scalars, 'String'>,
  /**
   * [sales][VELO]
   * Date of transaction
   */
  created?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [sales][VELO]
 * Transactions info
 */
export type Transactions = {|
  __typename?: 'Transactions',
  /**
   * [sales][VELO]
   * Specifies the offset of results to return
   */
  start?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [sales][VELO]
   * Specifies the maximum number of results to return at once
   */
  count?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [sales][VELO]
   * The number of transactions
   */
  total?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [sales][VELO]
   * Transactions items data
   */
  items?: ?Array<?TransactionItems>,
|};

/**
 * [sales][BAT]
 * Transactions input
 */
export type TransactionsInput = {|
  /**
   * [sales][BAT]
   * Specifies the offset of results to return
   */
  start?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [sales][BAT]
   * Specifies the maximum number of results to return at once
   */
  count?: ?$ElementType<Scalars, 'Int'>,
|};

/**
 * [quote]
 * Input is used as an argument for 'updateBundleCartItems' mutation
 */
export type UpdateBundleCartItemsInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Cart items
   */
  cart_items?: ?Array<?BundleCartItemUpdateInput>,
|};

/**
 * [quote]
 * Input is used as an argument for 'updateGiftCardCartItems' mutation
 */
export type UpdateGiftCardCartItemsInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Cart items
   */
  cart_items?: ?Array<?GiftCardCartItemUpdateInput>,
|};

export type UpdatePreferencesInput = {|
  /**
   * [BAT][account]
   * Preferences
   */
  preferences?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [BAT][account]
   * Consent
   */
  consent?: ?$ElementType<Scalars, 'Boolean'>,
|};

export type UpdatePreferencesOutput = {|
  __typename?: 'UpdatePreferencesOutput',
  /**
   * [BAT][account]
   * Response after success preferences updates
   */
  success?: ?$ElementType<Scalars, 'Boolean'>,
|};

export type UpdateViewerInfoInput = {|
  /**
   * [BAT][account]
   * Consent
   */
  consent?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [account]
   * User date of birth
   */
  dob?: ?$ElementType<Scalars, 'String'>,
  /**
   * [account]
   * User email
   */
  email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [account]
   * User first name
   */
  first_name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [account]
   * User gender
   */
  gender?: ?GenderEnum,
  /**
   * [account]
   * User last name
   */
  last_name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [account]
   * Phone number
   */
  phone_number?: ?$ElementType<Scalars, 'String'>,
  /**
   * [BAT][account]
   * Agent referral code
   */
  referral?: ?$ElementType<Scalars, 'String'>,
|};

export type UpdateViewerInput = {|
  /**
   * [account]
   * User information
   */
  viewer_info?: ?UpdateViewerInfoInput,
  /**
   * [account]
   * Current Password String
   */
  password?: ?$ElementType<Scalars, 'String'>,
  /**
   * [account]
   * New Password String
   */
  new_password?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [wishlist]
 * Input is used as a part for 'UpdateWishlistBundleItemsInput' input
 */
export type UpdateWishlistBundleItemInput = {|
  /**
   * [wishlist]
   * Wishlist item ID
   */
  wishlist_item_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [wishlist]
   * Bundle options
   */
  bundle_options?: ?Array<?BundleOptionInput>,
  /**
   * [wishlist]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
|};

/**
 * [wishlist]
 * Input is used as an argument for 'updateBundleWishlistItems' mutation
 */
export type UpdateWishlistBundleItemsInput = {|
  /**
   * [wishlist]
   * Wishlist items
   */
  items?: ?Array<?UpdateWishlistBundleItemInput>,
|};

/**
 * [wishlist]
 * Input is used as a part for 'UpdateWishlistConfigurableItemsInput' input
 */
export type UpdateWishlistConfigurableItemInput = {|
  /**
   * [wishlist]
   * Wishlist item ID
   */
  wishlist_item_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [wishlist]
   * Variant product ID
   */
  variant_product_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [wishlist]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
|};

/**
 * [wishlist]
 * Input is used as an argument for 'updateConfigurableWishlistItems' mutation
 */
export type UpdateWishlistConfigurableItemsInput = {|
  /**
   * [wishlist]
   * Wishlist items
   */
  items?: ?Array<?UpdateWishlistConfigurableItemInput>,
|};

/**
 * [wishlist]
 * Input is used as a part for 'UpdateWishlistGiftCardItemsInput' input
 */
export type UpdateWishlistGiftCardItemInput = {|
  /**
   * [wishlist]
   * Wishlist item ID
   */
  wishlist_item_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [wishlist]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [wishlist]
   * Amount of gift card
   */
  amount?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [wishlist]
   * Recipient name
   */
  recipient_name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [wishlist]
   * Recipient email
   */
  recipient_email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [wishlist]
   * Senders name
   */
  senders_name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [wishlist]
   * Senders email
   */
  senders_email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [wishlist]
   * The gift card message, filled in by sender
   */
  message?: ?$ElementType<Scalars, 'EscapedString'>,
|};

/**
 * [wishlist]
 * Input is used as an argument for 'updateGiftCardWishlistItems' mutation
 */
export type UpdateWishlistGiftCardItemsInput = {|
  /**
   * [wishlist]
   * Wishlist items
   */
  items?: ?Array<?UpdateWishlistGiftCardItemInput>,
|};

/**
 * [wishlist]
 * Input is used as a part for 'UpdateWishlistGroupedItemsInput' input
 */
export type UpdateWishlistGroupedItemInput = {|
  /**
   * [wishlist]
   * Wishlist item ID
   */
  wishlist_item_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [wishlist]
   * Wishlist item products
   */
  items?: ?Array<?WishlistGroupedItemInput>,
|};

/**
 * [wishlist]
 * Input is used as an argument for 'UpdateGroupedWishlistItems' mutation
 */
export type UpdateWishlistGroupedItemsInput = {|
  /**
   * [wishlist]
   * Wishlist items
   */
  items?: ?Array<?UpdateWishlistGroupedItemInput>,
|};

/**
 * [wishlist]
 * Input is used as a part for 'UpdateWishlistItemsInput' input
 */
export type UpdateWishlistItemInput = {|
  /**
   * [wishlist]
   * Wishlist item ID
   */
  wishlist_item_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [wishlist]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
|};

/**
 * [wishlist]
 * Input is used as an argument for 'updateWishlistItems' mutation
 */
export type UpdateWishlistItemsInput = {|
  /**
   * [wishlist]
   * Wishlist items
   */
  items?: ?Array<?UpdateWishlistItemInput>,
|};


export const UrlRewriteEntityTypeEnumValues = Object.freeze({
  CATEGORY: 'CATEGORY',
  CMS_PAGE: 'CMS_PAGE',
  MF_BLOG_INDEX: 'MF_BLOG_INDEX',
  MF_BLOG_POST: 'MF_BLOG_POST',
  PRODUCT: 'PRODUCT'
});


/**
 * [url-resolver][BAT]
 * This enumeration defines the entity type.
 */
export type UrlRewriteEntityTypeEnum = $Values<typeof UrlRewriteEntityTypeEnumValues>;

export type User = {|
  __typename?: 'User',
  /**
   * [user]
   * List of user stored addresses
   */
  addresses?: ?Array<?Address>,
  /**
   * [user]
   * Connected social login providers
   */
  connected_social_providers?: ?Array<?SocialProviderConnection>,
  /**
   * [user][BAT]
   * Consent
   */
  consent?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [user][BAT]
   * User date of birth
   */
  dob?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * User email. can be used as part of login operation.
   */
  email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * User first name. In case last_name is null, used as full name.
   */
  first_name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user][BAT]
   * User gender
   */
  gender?: ?GenderEnum,
  /**
   * [user]
   * User entity id.
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [user][BAT]
   * Age Verified
   */
  is_age_verified?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [user][BAT]
   * Indicates if it's a registration using social network
   */
  is_social_register?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [user][BAT]
   * User KTP ID
   */
  ktp_id?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * User last name
   */
  last_name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * If user has newsletter subscription
   */
  newsletter_subscribe?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [user]
   * Loads information about user order.
   * Requires authorization.
   */
  order?: ?Order,
  /**
   * [user]
   * Loads information about user orders.
   * Requires authorization.
   */
  orders?: ?OrderSearch,
  /**
   * [user][BAT]
   * Information about a customer's password
   */
  password_info?: ?PasswordInfo,
  /**
   * [user]
   * User phone number. Format is not restricted.
   */
  phone_number?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user][BAT]
   * Prefix
   */
  prefix?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user][BAT]
   * Agent referral code
   */
  referral?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * List of user saved payment methods
   */
  saved_payments?: ?Array<?SavedPayment>,
  /**
   * [user][BAT]
   * Status Code
   */
  status_code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * Loads information about user wishlist.
   * Requires authorization.
   */
  wishlist?: ?Wishlist,
|};


export type UserOrderArgs = {|
  order_id?: ?$ElementType<Scalars, 'ID'>,
|};


export type UserOrdersArgs = {|
  start: $ElementType<Scalars, 'Int'>,
  count: $ElementType<Scalars, 'Int'>,
|};

export type UserEmail = {|
  __typename?: 'UserEmail',
  /**
   * [user]
   * Return result about user email availability.
   */
  registered?: ?$ElementType<Scalars, 'Boolean'>,
|};

export type UserForSocialRegister = {|
  __typename?: 'UserForSocialRegister',
  /**
   * [user][BAT]
   * User first name
   */
  first_name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user][BAT]
   * User last name
   */
  last_name?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user][BAT]
   * User email
   */
  email?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [product]
 * Product Variations based on variation_attributes selection. Only for type Configurable
 */
export type Variation = {|
  __typename?: 'Variation',
  /**
   * [product][BAT]
   * Flag, which indicates if current variation is in stock
   */
  is_in_stock?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [product]
   * Product, that is matched to variation_attributes array
   */
  product?: ?Product,
  /**
   * [product]
   * Array of variation values, that defines unique identification of Configurable Product variation
   */
  variation_values?: ?Array<?VariationValue>,
|};

/**
 * [product]
 * VariationAttribute defines configurable attributes for the specified product
 */
export type VariationAttribute = {|
  __typename?: 'VariationAttribute',
  /**
   * [product]
   * The filter name, user friendly title
   */
  name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [product][BAT]
   * Total amount of variations
   */
  options_count?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [product]
   * One of the 'VariationAttributeType' options, used to define how variation attribute will be displayed in Application
   */
  type?: ?VariationAttributeType,
  /**
   * [product]
   * An array that defines the id codes assigned to the configurable product. Also contains dislay information
   */
  values?: ?Array<?VariationAttributeValue>,
  /**
   * [product]
   * The ID assigned to the VariationAttribute, used in 'VariationValue' as 'id'
   */
  variation_attribute_id?: ?$ElementType<Scalars, 'ID'>,
|};

export const VariationAttributeTypeValues = Object.freeze({
  /**
   * [product]
   * Dropdown, allows to select text option from from Select element
   */
  DROPDOWN: 'DROPDOWN',
  /**
   * [product]
   * Swatch, where value is text information
   */
  TEXT_SWATCH: 'TEXT_SWATCH',
  /**
   * [product]
   * Swatch, where value is color information (hex)
   */
  COLOR_SWATCH: 'COLOR_SWATCH',
  /**
   * [product]
   * Swatch, where value is image url
   */
  IMAGE_SWATCH: 'IMAGE_SWATCH'
});


/**
 * [product]
 * Variation Attribute type is used to define how Variation setting will be displayed in Application
 */
export type VariationAttributeType = $Values<typeof VariationAttributeTypeValues>;

/**
 * [product]
 * Variation Attribute Value is used on Product Details to select specific attribute value of Configurable Product
 */
export type VariationAttributeValue = {|
  __typename?: 'VariationAttributeValue',
  /**
   * [product]
   * Detailed information about the filter option. The value can include simple HTML tags
   */
  description?: ?$ElementType<Scalars, 'EscapedString'>,
  /**
   * [product]
   * The ID assigned to the filter, used in 'VariationValue' as 'value'
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product]
   * User friendly text, that is used in 'title' attribute or in tooltip
   */
  name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [product][BAT]
   * Amount of filled indicators, which should be displayed in CUSTOM swatch (e.g. total amount of indicators 5, but only 3 of them should be filled)
   */
  position?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [product]
   * Value of the Variation Attribute
   * It can vary depending on Variation Attribute type:
   *     string for DROPDOWN and TEXT_SWATCH
   *     color (hex) for COLOR_SWATCH
   *     url for IMAGE_SWATCH
   */
  value?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [product]
 * Variation Value is used in 'Variation' for unique identification of Configurable Product variation
 */
export type VariationValue = {|
  __typename?: 'VariationValue',
  /**
   * [product]
   * VariationAttribite ID
   */
  variation_attribute_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product]
   * VariationAttributeValue ID
   */
  value?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [product]
 * Variation value is used as use to query products variations
 */
export type VariationValueInput = {|
  /**
   * [product]
   * Variation value input ID
   */
  variation_attribute_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [product]
   * Variation value input value
   */
  value?: ?$ElementType<Scalars, 'String'>,
|};

/**
 * [general]
 * Generic Video type, that is used across whole application
 */
export type Video = {|
  __typename?: 'Video',
  /**
   * [general]
   * The ID assigned to the image, can be equal to url
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [general]
   * User friendly text, that is used as title
   */
  title?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [general]
   * User friendly text, that is used as description
   */
  description?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [general]
   * Relative or absolute path to the video
   */
  url?: ?$ElementType<Scalars, 'AbsoluteUrl'>,
  /**
   * [general]
   * Relative or absolute path to the preview image
   */
  preview_url?: ?$ElementType<Scalars, 'AbsoluteUrl'>,
|};

export type Viewer = {|
  __typename?: 'Viewer',
  /**
   * [user][BAT]
   * Flag, which identifies that user has confirmed the account (if account confirmation feature is turned off in admin panel, this field will be true for all users). The value could be boolean or null (null will meant literally the same as true)
   */
  confirmed?: ?$ElementType<Scalars, 'Boolean'>,
  /**
   * [user]
   * Token, used for authorization on Server. It is being set as header
   * Requires authorization.
   */
  token?: ?$ElementType<Scalars, 'String'>,
  /**
   * [user]
   * Current User information.
   * Requires authorization.
   */
  user?: ?User,
  /**
   * [user][BAT]
   * User information for the registration using social network
   */
  user_for_social_register?: ?UserForSocialRegister,
|};

export type WalletCouponInfo = {|
  __typename?: 'WalletCouponInfo',
  /**
   * [sales][VELO]
   * Coupon's expiration day
   */
  exp_day?: ?$ElementType<Scalars, 'String'>,
  /**
   * [sales][VELO]
   * Coupon's code
   */
  code?: ?$ElementType<Scalars, 'String'>,
  /**
   * [sales][VELO]
   * Coupon's description
   */
  description?: ?$ElementType<Scalars, 'String'>,
  /**
   * [sales][VELO]
   * Shows that the coupon may use
   */
  is_usable?: ?$ElementType<Scalars, 'Boolean'>,
|};

export type WalletRulesWithCoupons = {|
  __typename?: 'WalletRulesWithCoupons',
  /**
   * [sales][VELO]
   * Coupon id
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [sales][VELO]
   * Coupon label
   */
  label?: ?$ElementType<Scalars, 'String'>,
  /**
   * [sales][VELO]
   * Coupon info
   */
  coupon_info?: ?WalletCouponInfo,
|};

/**
 * [wishlist]
 * Provides wishlist information.
 */
export type Wishlist = {|
  __typename?: 'Wishlist',
  /**
   * [wishlist]
   * Wishlist products
   */
  products?: ?WishlistSearch,
  /**
   * [wishlist]
   * Timestamp indicating when the wishlist was created
   */
  created_at?: ?$ElementType<Scalars, 'String'>,
|};


/**
 * [wishlist]
 * Provides wishlist information.
 */
export type WishlistProductsArgs = {|
  start?: ?$ElementType<Scalars, 'Int'>,
  count?: ?$ElementType<Scalars, 'Int'>,
|};

/**
 * [wishlist]
 * Input is used as a part for 'AddBundleItemsToWishlistInput' input
 */
export type WishlistBundleItemInput = {|
  /**
   * [wishlist]
   * Product ID
   */
  product_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [wishlist]
   * Bundle options
   */
  bundle_options?: ?Array<?BundleOptionInput>,
  /**
   * [wishlist]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [wishlist]
   * Quote item to remove
   */
  quote_item_id?: ?$ElementType<Scalars, 'ID'>,
|};

/**
 * [wishlist]
 * Input is used as a part for 'AddConfigurableItemsToWishlistInput' input
 */
export type WishlistConfigurableItemInput = {|
  /**
   * [wishlist]
   * Product ID
   */
  product_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [wishlist]
   * Variant product ID
   */
  variant_product_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [wishlist]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [wishlist]
   * Quote item to remove
   */
  quote_item_id?: ?$ElementType<Scalars, 'ID'>,
|};

/**
 * [wishlist]
 * Input is used as a part for 'AddGiftCardItemToWishlistInput' input
 */
export type WishlistGiftCardItemInput = {|
  /**
   * [wishlist]
   * Product ID
   */
  product_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [wishlist]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [wishlist]
   * Amount of gift card
   */
  amount?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [wishlist]
   * Recipient name
   */
  recipient_name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [wishlist]
   * Recipient email
   */
  recipient_email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [wishlist]
   * Senders name
   */
  senders_name?: ?$ElementType<Scalars, 'LocalizedString'>,
  /**
   * [wishlist]
   * Senders email
   */
  senders_email?: ?$ElementType<Scalars, 'String'>,
  /**
   * [wishlist]
   * The gift card message, filled in by sender
   */
  message?: ?$ElementType<Scalars, 'EscapedString'>,
  /**
   * [wishlist]
   * Quote item to remove
   */
  quote_item_id?: ?$ElementType<Scalars, 'ID'>,
|};

/**
 * [wishlist]
 * Input is used as a part for 'WishlistGroupedProductItemInput' input
 */
export type WishlistGroupedItemInput = {|
  /**
   * [wishlist]
   * Product ID
   */
  product_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [wishlist]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
|};

/**
 * [wishlist]
 * Input is used as a part for 'AddGroupedItemsToWishlistInput' input
 */
export type WishlistGroupedProductItemInput = {|
  /**
   * [wishlist]
   * Product ID
   */
  product_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [wishlist]
   * Wishlist items
   */
  items?: ?Array<?WishlistGroupedItemInput>,
|};

/**
 * [wishlist]
 * Provides wishlist items information
 */
export type WishlistItem = {|
  __typename?: 'WishlistItem',
  /**
   * [wishlist]
   * Wishlist item ID
   */
  id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [wishlist]
   * Timestamp indicating when the item was added to wishlist
   */
  added_at?: ?$ElementType<Scalars, 'String'>,
  /**
   * [wishlist]
   * Wishlist item product
   */
  product?: ?Product,
  /**
   * [wishlist]
   * Quantity of wishlist item product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [wishlist]
   * Configurable product variation
   */
  configurable_variation?: ?Variation,
  /**
   * [wishlist]
   * Bundle product options and total sum
   */
  bundle_info?: ?BundleInfo,
  /**
   * [wishlist]
   * Gift card information
   */
  gift_card?: ?GiftCardItem,
  /**
   * [wishlist]
   * Grouped product set
   */
  product_set?: ?Product,
|};

/**
 * [wishlist]
 * Input is used as a part for 'addItemsToWishlistInput' input
 */
export type WishlistItemInput = {|
  /**
   * [wishlist]
   * Product ID
   */
  product_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [wishlist]
   * Quantity of product
   */
  quantity?: ?$ElementType<Scalars, 'Float'>,
  /**
   * [wishlist]
   * Quote item to remove
   */
  quote_item_id?: ?$ElementType<Scalars, 'ID'>,
|};

/**
 * [wishlist]
 * Provides wishlist search data
 */
export type WishlistSearch = {|
  __typename?: 'WishlistSearch',
  /**
   * [wishlist]
   * Offset of returned data for particular wishlist search
   */
  start?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [wishlist]
   * The number of wishlist items returned
   */
  count?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [wishlist]
   * Total number of wishlist items matching specified criteria
   */
  total?: ?$ElementType<Scalars, 'Int'>,
  /**
   * [wishlist]
   * An array of wishlist items that match the specified search criteria
   */
  items?: ?Array<?WishlistItem>,
|};

/**
 * [quote]
 * Input is used as an argument for 'addConfigurableItemsToCart' mutation
 */
export type AddConfigurableItemsToCartInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Cart items
   */
  cart_items?: ?Array<?CartConfigurableItemInput>,
  /**
   * [quote]
   * Remove from placement after successful 'Add to Cart'
   */
  remove_from?: ?AddToCartPlacementTypeEnum,
|};

/**
 * [quote]
 * Input is used as an argument for 'addGiftCardItemsToCart' mutation
 */
export type AddGiftCardItemsToCartInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Cart items
   */
  cart_items?: ?Array<?CartGiftCardItemInput>,
  /**
   * [quote]
   * Remove from placement after successful 'Add to Cart'
   */
  remove_from?: ?AddToCartPlacementTypeEnum,
|};

/**
 * [quote]
 * Input is used as an argument for 'addItemsToCart' mutation
 */
export type AddItemsToCartInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Cart items
   */
  cart_items?: ?Array<?CartItemInput>,
  /**
   * [quote]
   * Remove from placement after successful 'Add to Cart'
   */
  remove_from?: ?AddToCartPlacementTypeEnum,
|};

export type IsCanShowFreeGiftPopup = {|
  __typename?: 'isCanShowFreeGiftPopup',
  /**
   * [free-gift][BAT]
   * Show flag
   */
  show?: ?$ElementType<Scalars, 'Boolean'>,
|};

/**
 * [quote]
 * Input is used as an argument for 'removeItemFromCart' mutation
 */
export type RemoveItemFromCartInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Cart item ID
   */
  cart_item_id?: ?$ElementType<Scalars, 'ID'>,
|};

/**
 * [quote]
 * Input is used as an argument for 'updateCartItems' mutation
 */
export type UpdateCartItemsInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Cart items
   */
  cart_items?: ?Array<?CartItemUpdateInput>,
|};

/**
 * [quote]
 * Input is used as an argument for 'updateConfigurableCartItems' mutation
 */
export type UpdateConfigurableCartItemsInput = {|
  /**
   * [quote]
   * Cart ID
   */
  cart_id?: ?$ElementType<Scalars, 'ID'>,
  /**
   * [quote]
   * Cart items
   */
  cart_items?: ?Array<?ConfigurableCartItemUpdateInput>,
|};
