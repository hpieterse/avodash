using System.ComponentModel.DataAnnotations;

namespace avodash.Models.Enums
{
    public enum PackageType
    {
        [Display(Name = "Bulk Small/Medium Hass (PLU 4046)")]
        PLU4046 = 1,
        [Display(Name = "Bulk Large Hass (PLU 4225)")]
        PLU4225 = 2,
        [Display(Name = "Bulk X-Large Hass (PLU 4770)")]
        PLU4770 = 3,
        [Display(Name = "Small Bag")]
        SmallBag = 4,
        [Display(Name = "Large Bag")]
        LargeBag = 5,
        [Display(Name = "X-Large Bag")]
        XLargeBag = 6,
    }
}
