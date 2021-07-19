using System.ComponentModel.DataAnnotations;

namespace avodash.Models.Enums
{
    public enum PackageType
    {
        [Display(Name = "Bulk Small/Medium Hass (PLU 4046)", ShortName = "PLU 4046")]
        PLU4046 = 1,
        [Display(Name = "Bulk Large Hass (PLU 4225)", ShortName = "PLU 4225")]
        PLU4225 = 2,
        [Display(Name = "Bulk X-Large Hass (PLU 4770)", ShortName = "PLU 4770")]
        PLU4770 = 3,
        [Display(Name = "Small Bag", ShortName = "Small Bag")]
        SmallBag = 4,
        [Display(Name = "Large Bag", ShortName = "Large Bag")]
        LargeBag = 5,
        [Display(Name = "X-Large Bag", ShortName = "X-Large Bag")]
        XLargeBag = 6,
    }
}
